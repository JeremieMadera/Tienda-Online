import "./ProductSkeleton.css";

export default function ProductSkeleton() {
  return (
    <article className="skeleton-card">
      <div className="skeleton-card__image animate-pulse"></div>
      <div className="skeleton-card__info">
        <div className="skeleton-card__text skeleton-card__category animate-pulse"></div>
        <div className="skeleton-card__text skeleton-card__title animate-pulse"></div>
        <div className="skeleton-card__text skeleton-card__price animate-pulse"></div>
      </div>
    </article>
  );
}
