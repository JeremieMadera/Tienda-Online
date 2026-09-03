import "./EditorialBanner.css";

export default function EditorialBanner({ onShop }) {
  return (
    <section className="editorial">
      <img
        src="https://images.unsplash.com/photo-1619603364937-8d7af41ef206?w=1400&h=800&fit=crop&auto=format"
        alt="Man in brown wool overcoat"
      />
      <div className="editorial__overlay">
        <p className="editorial__eyebrow">Discover the Collection</p>
        <h2 className="editorial__title">The Best Designs,<br />Made to Last</h2>
        <button className="editorial__btn" onClick={onShop}>Shop Now</button>
      </div>
    </section>
  );
}
