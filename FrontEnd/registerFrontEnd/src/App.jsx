import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx'; // Import the new Home component
import AfterCare from './TattoAfterCare/AfterCare';
import Navbar from './components/navbar/navbar.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Shop from './Pages/Store/Shop.jsx';
import Artist from './Pages/Artists/Artists.jsx';
import Privacy from './Pages/Privacy/Privacy.jsx';

import './App.css';
const preloadGif = new Image();
preloadGif.src = './assetsboogieboys.gif';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        <Route path="/artists"  element={<Artist/>} />
        <Route path="/designs"  />
        <Route path="/shop"  element={<Shop/>}/>
        <Route path="/appointments"  />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/privacy" element={<Privacy />} />


        {/* Tattoo AfterCare Route */}
        <Route path="/aftercare" element={<AfterCare />} />
      </Routes>
    </Router>
  );
}

export default App;
