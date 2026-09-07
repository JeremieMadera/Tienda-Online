import { useEffect, useState } from "react";
import { PRODUCTS } from "../../data/products";
import ProductCard from "./ProductCard";
import "./ProductCatalog.css";

export default function ProductCatalog({ activeCategory, setActiveCategory, onAddToCart }) {
  const [activeSubcat, setActiveSubcat] = useState("all");

  useEffect(() => {
    setActiveSubcat("all");
  }, [activeCategory]);

  const matchesCategory = (product) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "new arrivals") return product.badge === "New";
    if (activeCategory === "sale") return product.badge === "Sale";
    return product.category === activeCategory;
  };

  const subcats = ["all", ...Array.from(new Set(
    PRODUCTS
      .filter(matchesCategory)
      .map((p) => p.subcategory)
  ))];

  const filtered = PRODUCTS.filter((p) => {
    const catMatch = matchesCategory(p);
    const subcatMatch = activeSubcat === "all" || p.subcategory === activeSubcat;
    return catMatch && subcatMatch;
  });

  const title = {
    all: "All Pieces",
    men: "Menswear",
    women: "Womenswear",
    "new arrivals": "New Arrivals",
    sale: "Sale",
  }[activeCategory];

  return (
    <section id="products" className="catalog">
      <div className="catalog__header">
        <div>
          <p className="catalog__eyebrow">Our Collection</p>
          <h2 className="catalog__title">{title}</h2>
        </div>
        <div className="catalog__toggle">
          {["all", "men", "women"].map((cat) => (
            <button
              key={cat}
              className={`catalog__toggle-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => { setActiveCategory(cat); setActiveSubcat("all"); }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog__filters">
        {subcats.map((sub) => (
          <button
            key={sub}
            className={`catalog__filter-btn${activeSubcat === sub ? " active" : ""}`}
            onClick={() => setActiveSubcat(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="catalog__grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="catalog__empty">
          <p className="catalog__empty-title">No pieces found</p>
          <p className="catalog__empty-sub">Try a different category or filter.</p>
        </div>
      )}
    </section>
  );
}
