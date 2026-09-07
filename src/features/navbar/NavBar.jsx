import { useState, useEffect } from "react";
import I8 from "../../shared/components/I8/I8";
import "./NavBar.css";

const NAV_LINKS = ["all", "men", "women", "new arrivals", "sale"];

export default function NavBar({ cartCount, onCartOpen, activeCategory, setActiveCategory }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLink = (link) => {
    if (["all", "men", "women"].includes(link)) setActiveCategory(link);
    else document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar__inner">
        <span className="navbar__logo">FLOW FACTORY</span>

        <nav className="navbar__nav">
          {NAV_LINKS.map((link) => {
            const isActive = ["all", "men", "women"].includes(link) && activeCategory === link;
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

        <div className="navbar__actions">
          {searchOpen ? (
            <div className="navbar__search">
              <input
                className="navbar__search-input"
                type="text"
                placeholder="Search"
                aria-label="Search products"
                autoFocus
              />
              <button
                className="navbar__icon-btn"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
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
          <button className="navbar__icon-btn" aria-label="Account">
            <I8 name="user-male-circle" size={20} color="17120B" />
          </button>
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
    </header>
  );
}
