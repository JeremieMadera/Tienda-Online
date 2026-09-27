import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productsApi";
import "./ProductCatalog.css";

export default function ProductCatalog({ activeCategory, setActiveCategory, searchQuery, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; // 8 products per page

  useEffect(() => {
    getProducts(page, limit, activeCategory, searchQuery)
      .then((res) => {
        setProducts(res.products || []);
        setTotalPages(res.totalPages || 1);
      })
      .catch(() => setError("No se pudieron cargar los productos."));
  }, [page, activeCategory, searchQuery]);

  useEffect(() => {
    // Reset to page 1 when category or search changes
    setPage(1);
  }, [activeCategory, searchQuery]);

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

      <div className="catalog__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="catalog__pagination" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button 
            disabled={page === 1} 
            onClick={() => {
              setPage((p) => Math.max(1, p - 1));
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ padding: '0.5rem 1rem', cursor: page === 1 ? 'not-allowed' : 'pointer', border: '1px solid #ddd', background: '#fff' }}
          >
            Previous
          </button>
          <span style={{ padding: '0.5rem', fontWeight: 'bold' }}>Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages} 
            onClick={() => {
              setPage((p) => Math.min(totalPages, p + 1));
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ padding: '0.5rem 1rem', cursor: page === totalPages ? 'not-allowed' : 'pointer', border: '1px solid #ddd', background: '#fff' }}
          >
            Next
          </button>
        </div>
      )}

      {error && <p>{error}</p>}

      {products.length === 0 && (
        <div className="catalog__empty">
          <p className="catalog__empty-title">No pieces found</p>
          <p className="catalog__empty-sub">Try a different category or filter.</p>
        </div>
      )}
    </section>
  );
}
