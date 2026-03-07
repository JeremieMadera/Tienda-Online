import './Homepage.css';
import { ProductCard } from '../../components/Productcard/productcard';
import assets from '../../assets/camisa.png';
import { useRef, useEffect } from 'react';

function Homepage() {
const scrollRef = useRef(null);

 useEffect(() => {
  const container = scrollRef.current;
  if (!container) return;

  const autoScroll = () => {
    const { scrollLeft, offsetWidth, scrollWidth } = container;
    
    // Si estamos llegando al CLON (la foto 7)
    if (scrollLeft + offsetWidth >= scrollWidth - 10) {
      
      // 1. Saltamos al inicio real (Foto 1) SIN animación
      container.style.scrollBehavior = 'auto'; 
      container.scrollLeft = 0;

      // 2. Pequeño truco: esperamos un instante y volvemos a activar el scroll suave
      // para que el SIGUIENTE movimiento sí sea fluido
      setTimeout(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollBy({ left: offsetWidth, behavior: 'smooth' });
      }, 50);

    } else {
      // Movimiento normal entre las fotos 1 y 6
      container.scrollBy({ left: offsetWidth, behavior: 'smooth' });
    }
  };

  const interval = setInterval(autoScroll, 3000);
  return () => clearInterval(interval);
}, []);

  return (
    <section className="homepage">
     
     
        
        
        <div className="homepage-content" ref={scrollRef}>
        {/*<button className="nav-btn right" onClick={() => moveScroll('right')}>►</button>*/}
        {/*<button className="nav-btn left" onClick={() => moveScroll('left')}>◄</button>*/}
        
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
            <img src={assets} alt="Product 6"></img>
            </div>

            <div className="card">
          <article><p>Brooch-Detail Wrap Jacket</p><p>$69.99</p><button>Buy now</button></article>
          <img src={assets} alt="Product 1 Clone" />
        </div>
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