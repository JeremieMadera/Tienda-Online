import './Contentsection.css';
import { Fa6SolidBoxOpen } from '../../components/Logos/Fa6SolidBoxOpen';
import { FluentPremium12Filled } from '../../components/Logos/FluentPremium12Filled'; 
import {FluentMdl2Market} from'../../components/Logos/FluentMdl2Market';
import { ProductCard } from '../../components/Productcard/productcard'; 

function Contentsection() {
  return (
    <>
    <section className="content-section">
      
      <div className ="Logos-box" ><Fa6SolidBoxOpen/></div>
      <div className="Logos-diamond"><FluentPremium12Filled/></div>
      <div className="Logos-graph"><FluentMdl2Market/></div>


      <div className="discover-design">
        <div className ="text-discover">
          <h2>Discover the best designs</h2>
        </div>
      </div>

          
       
      
      
       
    </section>

  
    <section className="content-section2">
      <div className ="genre-section">
      <article><a><img herf="#"></img></a>Men</article>
      <article><a><img href="#"></img></a>Women</article>
      </div>
      <div className="line-separator"><p>Shirt</p></div>
      <div className ="products-container">
         
          <ProductCard productName="Product 1" productDescription="This is the description for Product 1." price="$19.99"/>
          <ProductCard productName="Product 2" productDescription="This is the description for Product 2." price="$29.99"/>
          <ProductCard productName="Product 3" productDescription="This is the description for Product 3." price="$39.99"/>
          <ProductCard productName="Product 4" productDescription="This is the description for Product 4." price="$49.99"/>
          <ProductCard productName="Product 5" productDescription="This is the description for Product 5." price="$59.99"/>
          
      </div>
      <div className="line-separator"><p>Pants</p></div>
      <div className ="products-container">
        
          <ProductCard productName="Product 6" productDescription="This is the description for Product 1." price="$19.99"/>
          <ProductCard productName="Product 7" productDescription="This is the description for Product 2." price="$29.99"/>
          <ProductCard productName="Product 8" productDescription="This is the description for Product 3." price="$39.99"/>
          <ProductCard productName="Product 9" productDescription="This is the description for Product 4." price="$49.99"/>
          <ProductCard productName="Product 10" productDescription="This is the description for Product 5." price="$59.99"/>
          
      </div>
      <div className="line-separator"><p>Shoes</p></div>
      <div className ="products-container">
          
          <ProductCard productName="Product 11" productDescription="This is the description for Product 1." price="$19.99"/>
          <ProductCard productName="Product 12" productDescription="This is the description for Product 2." price="$29.99"/>
          <ProductCard productName="Product 13" productDescription="This is the description for Product 3." price="$39.99"/>
          <ProductCard productName="Product 14" productDescription="This is the description for Product 4." price="$49.99"/>
          <ProductCard productName="Product 15" productDescription="This is the description for Product 5." price="$59.99"/>
          
      </div>

    </section>

    <section className="pre-Footer">
      <div className="pre-Footer-text">
      <p>Location</p>
      <p>Contact Us</p>
      <p>Social Media</p>
      </div>
    </section>
    </>
  );
}





export default Contentsection;