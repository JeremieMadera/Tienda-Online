
import Header from './components/Header/Header.jsx'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import Homepage from './pages/Homepage/Homepage.jsx'

function App() {
 

  return (
    <>
      <div className="App">
        <Header/>
        <main>
          <Homepage/>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
