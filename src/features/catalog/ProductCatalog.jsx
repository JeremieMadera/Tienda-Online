import { useState } from "react";
import { PRODUCTS } from "../../data/products";
import ProductCard from "./ProductCard";
import "./ProductCatalog.css";

export default function ProductCatalog({ activeCategory, setActiveCategory, onAddToCart }) {
  const [activeSubcat, setActiveSubcat] = useState("all");

  const subcats = ["all", ...Array.from(new Set(
    PRODUCTS
      .filter((p) => activeCategory === "all" || p.category === activeCategory)
      .map((p) => p.subcategory)
  ))];

  const filtered = PRODUCTS.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const subcatMatch = activeSubcat === "all" || p.subcategory === activeSubcat;
    return catMatch && subcatMatch;
  });

  const title = activeCategory === "all" ? "All Pieces" : activeCategory === "men" ? "Menswear" : "Womenswear";

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
