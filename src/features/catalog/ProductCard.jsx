import { useState } from "react";
import I8 from "../../shared/components/I8/I8";
import { SIZES } from "../../data/products";
import "./ProductCard.css";

const BADGE_COLORS = { New: "#8C5F34", Trending: "#2A2318", Sale: "#C0392B" };

export default function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img src={product.image} alt={product.name} />

        <div className="card__overlay">
          <div className="card__sizes">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`card__size-btn${selectedSize === s ? " selected" : ""}`}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(s); }}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            className={`card__add-btn${added ? " added" : selectedSize ? " ready" : ""}`}
            onClick={(e) => { e.stopPropagation(); handleAdd(); }}
            disabled={!selectedSize}
          >
            {added ? "Added ✓" : selectedSize ? "Add to Cart" : "Select a Size"}
          </button>
        </div>

        {product.badge && (
          <span className="card__badge" style={{ backgroundColor: BADGE_COLORS[product.badge] ?? "#8C5F34" }}>
            {product.badge}
          </span>
        )}

        <button className="card__wishlist" aria-label="Wishlist" onClick={(e) => e.stopPropagation()}>
          <I8 name="like" size={16} color="17120B" />
        </button>
      </div>

      <div className="card__info">
        <p className="card__category">{product.category} — {product.subcategory}</p>
        <h3 className="card__name">{product.name}</h3>
        <p className="card__price">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
}
