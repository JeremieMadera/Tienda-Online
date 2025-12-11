import './Homepage.css';
import { ProductCard } from '../../components/Productcard/productcard';

function Homepage() {
  return (
    <section className="homepage">
        <div className="homepage-content">Content card
        </div>
        <div className="info-card"><h2>Info Card</h2></div>
        <div className ="products-container">
          <ProductCard productName="Product 1" productDescription="This is the description for Product 1." price="$19.99"/>
          <ProductCard productName="Product 2" productDescription="This is the description for Product 2." price="$29.99"/>
          <ProductCard productName="Product 3" productDescription="This is the description for Product 3." price="$39.99"/>
          <ProductCard productName="Product 4" productDescription="This is the description for Product 4." price="$49.99"/>
          <ProductCard productName="Product 5" productDescription="This is the description for Product 5." price="$59.99"/>
         </div>
      
         
          
    </section>
    
    
  );
}
export default Homepage;