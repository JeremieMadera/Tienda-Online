import './Header.css';


function Header() {
  return (
    <header className="header-container">
  
      
      <nav className ="header-ancords">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
            <div className ="header-buttons">
                <button>Sign Up</button>
                <button>Settings</button>
            </div>
   
   
    </header>);
}
export default Header;