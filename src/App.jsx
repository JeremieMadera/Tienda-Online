import { useState } from "react";
import NavBar from "./features/navbar/NavBar";
import HeroBanner from "./features/hero/HeroBanner";
import TrustStrip from "./features/trust/TrustStrip";
import ProductCatalog from "./features/catalog/ProductCatalog";
import EditorialBanner from "./features/editorial/EditorialBanner";
import CartDrawer from "./features/cart/CartDrawer";
import CheckoutModal from "./features/checkout/CheckoutModal";
import FooterSection from "./features/footer/FooterSection";
import "./App.css";

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleAddToCart = (product, size) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing)
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...product, quantity: 1, size }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemove = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <HeroBanner onShop={scrollToProducts} />
      <TrustStrip />
      <ProductCatalog
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAddToCart={handleAddToCart}
      />
      <EditorialBanner onShop={scrollToProducts} />
      <FooterSection />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
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
