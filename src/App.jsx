import { useState, useEffect } from "react";
import NavBar from "./features/navbar/NavBar";
import HeroBanner from "./features/hero/HeroBanner";
import TrustStrip from "./features/trust/TrustStrip";
import ProductCatalog from "./features/catalog/ProductCatalog";
import EditorialBanner from "./features/editorial/EditorialBanner";
import CartDrawer from "./features/cart/CartDrawer";
import CheckoutModal from "./features/checkout/CheckoutModal";
import AuthModal from "./features/auth/AuthModal";
import FooterSection from "./features/footer/FooterSection";
import { Routes, Route, useLocation } from "react-router-dom";
import { getMe, logout } from "./services/authApi";
import { getCart, addToCart, updateCartItem, removeFromCart } from "./services/cartApi";
import AdminDashboard from "./features/admin/AdminDashboard";
import UserProfile from "./features/profile/UserProfile";
import "./App.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  // Map backend item shape to frontend shape
  const normalizeItems = (items) =>
    items.map((i) => ({
      ...i,
      item_id: i.id,       // cart_items.id (for update/delete)
      id: i.product_id,    // product id (for display/matching)
      image: i.image_url,
      price: Number(i.price),
    }));

  useEffect(() => {
    getMe().then((u) => {
      setUser(u);
      if (u) getCart().then((items) => setCartItems(normalizeItems(items))).catch(() => {});
    }).catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleAddToCart = async (product, size) => {
    if (user) {
      try {
        const items = await addToCart(product.id, size, 1);
        setCartItems(normalizeItems(items));
      } catch { /* ignore */ }
    } else {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === product.id && i.size === size);
        if (existing)
          return prev.map((i) =>
            i.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
          );
        return [...prev, { ...product, quantity: 1, size }];
      });
    }
    setCartOpen(true);
  };

  const handleUpdateQty = async (itemId, delta) => {
    if (user) {
      const item = cartItems.find((i) => i.id === itemId);
      if (!item) return;
      const newQty = item.quantity + delta;
      try {
        const items = newQty <= 0
          ? await removeFromCart(item.item_id ?? item.id)
          : await updateCartItem(item.item_id ?? item.id, newQty);
        setCartItems(normalizeItems(items));
      } catch { /* ignore */ }
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + delta } : i))
           .filter((i) => i.quantity > 0)
      );
    }
  };

  const handleRemove = async (itemId) => {
    if (user) {
      const item = cartItems.find((i) => i.id === itemId);
      if (!item) return;
      try {
        const items = await removeFromCart(item.item_id ?? item.id);
        setCartItems(normalizeItems(items));
      } catch { /* ignore */ }
    } else {
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    }
  };

  const scrollToProducts = (category) => {
    if (category && typeof category === "string") {
      setActiveCategory(category);
    }
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        user={user}
        onAuthOpen={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={
          <>
            <HeroBanner onShop={scrollToProducts} />
            <TrustStrip />
            <ProductCatalog
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onAddToCart={handleAddToCart}
            />
            <EditorialBanner onShop={scrollToProducts} />
          </>
        } />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
      </Routes>
      <FooterSection />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCheckout={() => {
          setCartOpen(false);
          if (user) {
            setCheckoutOpen(true);
          } else {
            setAuthOpen(true);
          }
        }}
      />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuth={async (u) => {
          setUser(u);
          if (u) {
            for (const item of cartItems) {
              try {
                await addToCart(item.id, item.size, item.quantity);
              } catch (e) { /* ignore */ }
            }
            getCart()
              .then((items) => setCartItems(normalizeItems(items)))
              .catch(() => {});
          }
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onConfirm={() => { setCartItems([]); setCheckoutOpen(false); }}
      />
    </div>
  );
}

export default App;
