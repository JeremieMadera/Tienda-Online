
import Header from './shared/components/Header/Header.jsx'
import './App.css'
import Footer from './shared/components/Footer/Footer.jsx'
import Homepage from './features/home/Homepage.jsx'
import Contentsection from './features/content/Contentsection.jsx'



function App() {
 

  return (
    <>
      <div className="App">
       
        <Header/>
        <main>
          <Homepage/>
          
          <Contentsection/>
          
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
