import './App.css'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import Skills from './Pages/Skills'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import Footer from './Components/Footer'
import FlotingWhatsap from './Components/FlotingWhatsap'

function App() {


  return (
    <div className='overflow-x-hidden'>
    
      <NavBar/>
      <FlotingWhatsap/>        
     <div id="home"> <Home/></div>
      <div id="about"><About/></div>
     <div id="skills"> <Skills/></div>
      <div id="projects"><Projects/></div>
     <div id="contact"> <Contact/></div>
     <div id='Footeer'> <Footer/></div>



     
    </div>
  )
}

export default App
