import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import I8 from "../../shared/components/I8/I8";
import "./NavBar.css";

const NAV_LINKS = ["all", "men", "women", "new arrivals", "sale"];

export default function NavBar({ cartCount, onCartOpen, activeCategory, setActiveCategory, searchQuery, setSearchQuery, user, onAuthOpen, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLink = (link) => {
    setActiveCategory(link);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar__inner">
        <span className="navbar__logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          FLOW FACTORY
        </span>

        {isHome && (
          <nav className="navbar__nav">
            {NAV_LINKS.map((link) => {
              const isActive = activeCategory === link;
              return (
                <button
                  key={link}
                  className={`navbar__link${isActive ? " active" : ""}`}
                  onClick={() => handleLink(link)}
                >
                  {link}
                </button>
              );
            })}
          </nav>
        )}

        <div className="navbar__actions">
          {searchOpen ? (
            <div className="navbar__search">
              <input
                className="navbar__search-input"
                type="text"
                placeholder="Search"
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0) {
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 100);
                    } else {
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                autoFocus
              />
              <button
                className="navbar__icon-btn"
                aria-label="Close search"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <I8 name="search" size={20} color="17120B" />
              </button>
            </div>
          ) : (
            <button
              className="navbar__icon-btn"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <I8 name="search" size={20} color="17120B" />
            </button>
          )}
          <button className="navbar__icon-btn" aria-label="Account" onClick={user ? () => setAccountOpen(!accountOpen) : onAuthOpen}>
            <I8 name="user-male-circle" size={20} color="17120B" />
            {user && <span className="navbar__badge navbar__badge--user">●</span>}
          </button>
          {accountOpen && user && (
            <div className="navbar__account-dropdown">
              <p className="navbar__account-email">{user.email}</p>
              {user.role === "admin" && (
                <button
                  className="navbar__account-logout"
                  style={{ borderBottom: "1px solid #eee", marginBottom: "5px", paddingBottom: "10px" }}
                  onClick={() => { setAccountOpen(false); navigate("/admin"); }}
                >
                  Admin Panel
                </button>
              )}
              <button
                className="navbar__account-logout"
                style={{ borderBottom: "1px solid #eee", marginBottom: "5px", paddingBottom: "10px" }}
                onClick={() => { setAccountOpen(false); navigate("/profile"); }}
              >
                My Orders
              </button>
              <button className="navbar__account-logout" onClick={() => { setAccountOpen(false); onLogout(); }}>
                Sign Out
              </button>
            </div>
          )}
          <button className="navbar__icon-btn" aria-label="Cart" onClick={onCartOpen}>
            <I8 name="shopping-bag" size={20} color="17120B" />
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </button>
          <button
            className="navbar__icon-btn navbar__hamburger"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <I8 name="menu-2" size={22} color="17120B" />
          </button>
        </div>
      </div>

      {isHome && (
        <div className={`navbar__mobile-menu${mobileOpen ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="navbar__mobile-link"
              onClick={() => { handleLink(link); setMobileOpen(false); }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
