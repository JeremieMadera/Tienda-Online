import "./HeroBanner.css";

const STATS = [
  { label: "Products", value: "500+" },
  { label: "Brands", value: "40+" },
  { label: "Satisfied Customers", value: "12k" },
];

export default function HeroBanner({ onShop }) {
  return (
    <section className="hero">
      <div className="hero__image-wrap">
        <img
          src="https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=900&h=1100&fit=crop&auto=format"
          alt="Woman in formal dress"
        />
        <div className="hero__image-overlay" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">New Collection — Autumn 2026</p>
        <h1 className="hero__title">
          Dressed for<br />
          <em>Every Moment</em>
        </h1>
        <p className="hero__desc">
          Curated pieces for men and women — refined fabrics, considered cuts, and timeless silhouettes that move with your life.
        </p>
        <div className="hero__buttons">
          <button className="hero__btn-primary" onClick={onShop}>Shop Women</button>
          <button className="hero__btn-secondary" onClick={onShop}>Shop Men</button>
        </div>
        <div className="hero__stats">
          {STATS.map(({ label, value }) => (
            <div key={label}>
              <p className="hero__stat-value">{value}</p>
              <p className="hero__stat-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
