import React, { Fragment } from 'react';
import './App.css';
import './components/Destination.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import '../src/components/WeatherWidget.css'
import WidgetPage from './components/pages/WidgetPage';
import Footer from './components/Footer';
import './components/Footer.css';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';

window.localStorage.setItem('sizeCounter', 0);

 function App() {  
    
    return (
        <Router>
          <Navbar />
          <Routes style={{ flex: 1 }}>
            <Route path='/' exact element={ <Home /> }/>
            <Route path='/sign-up' element={ <Signup /> }/>
            <Route path='/log-in' element={ <Login /> }/>
            <Route path='/widget-page' element={ <WidgetPage /> }/>
            <Route path='/about-us' element={ <AboutUs /> }/>
            <Route path='/contact-us' element={ <ContactUs /> }/>
          </Routes>
          <Footer />
        </Router>
    ); 
  
}


export default App;
