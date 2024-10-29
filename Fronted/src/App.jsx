import { useState } from 'react';
import React from 'react';
import Registration from './components/Registration';
import './index.css';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PreMatch from './components/PreMatch';
import LiveArbitrage from './components/LiveArbitrage';
import LivePositiveEV from './components/LivePositiveEV';
import PreMatchPositiveEV from './components/PreMatchPositiveEV';
import Password from './components/Password';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSport, setSelectedSport] = useState('null');
  console.log(selectedSport);

  const handleSelect = (sport) => {
    setSelectedSport(sport);
  };

  return (
    <>
      <Router>
        {isAuthenticated ? (
          <>
            <Navbar setSelectedSport={setSelectedSport}/>
            <Routes>
              <Route path='/home' element={<Home onSelect={setSelectedSport} selectedSport={selectedSport}/>} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/prematch' element={<Home onSelect={handleSelect} selectedSport={selectedSport}/>} />
              <Route path='/livearbitrage' element={<LiveArbitrage onSelect={setSelectedSport} selectedSport={selectedSport}/>} />
              <Route path='/registor' element={<Registration />} />
              <Route path='/livepositiveEV' element={<LivePositiveEV onSelect={setSelectedSport} selectedSport={selectedSport}/>} />
              <Route path='/preMatchpositiveEV' element={<PreMatchPositiveEV onSelect={setSelectedSport} selectedSport={selectedSport}/>} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path='/' element={<Password setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        )}
      </Router>
      
    </>
  );
}

export default App;
