import './productcard.css';
export function ProductCard({productName,productDescription,price}) {
  return (
    <article className="product-card">
      <h3>{productName}</h3>
      <p>{productDescription}</p>
      <span>${price}</span>
    </article>
  );
}