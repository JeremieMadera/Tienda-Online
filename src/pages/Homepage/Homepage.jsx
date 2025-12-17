import './Homepage.css';
import { ProductCard } from '../../components/Productcard/productcard';
import assets from '../../assets/camisa.png';





function Homepage() {


  return (
    <section className="homepage">
     
        
        
        <div className="homepage-content" >
        <button className="nav-btn right" onClick={() => moveScroll('right')}>►</button>
        <button className="nav-btn left" onClick={() => moveScroll('left')}>◄</button>
        
          <div className="card">
            <article>
              <p>Brooch-Detail Wrap Jacket</p>
              <p>$69.99</p>
              <button>Buy now</button>
            </article>
            
            <img src={assets} alt="Product 1"></img>
          
            </div>
          <div className="card">
            <article>
              <p>Brooch-Detail Wrap Jacket</p>
              <p>$69.99</p>
              <button>Buy now</button>
            </article>
            <img src={assets} alt="Product 2"></img></div>
          <div className="card">
            <article>
              <p>Brooch-Detail Wrap Jacket</p>
              <p>$69.99</p>
              <button>Buy now</button>
            </article>
            <img src={assets} alt="Product 3"></img></div>
          <div className="card">
            <article>
              <p>Brooch-Detail Wrap Jacket</p>
              <p>$69.99</p>
              <button>Buy now</button>
            </article>
            <img src={assets} alt="Product 4"></img></div>
          <div className="card">
            <article>
              <p>Brooch-Detail Wrap Jacket</p>
              <p>$69.99</p>
              <button>Buy now</button>
            </article>
            <img src={assets} alt="Product 5"></img></div>
          <div className="card">
            <article>
              <p>Brooch-Detail Wrap Jacket</p>
              <p>$89.99</p>
              <button>Buy now</button>
            </article>
            <img src={assets} alt="Product 6"></img></div>
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