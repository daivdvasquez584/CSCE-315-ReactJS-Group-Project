import React from 'react';
import './App.css';
import '../components/Destination.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './Navbar';
import '../components/WeatherWidget.css'
import WidgetPage from './pages/WidgetPage';
import Footer from './Footer';
import '../components/Footer.css';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ForgotPassword from './pages/ForgotPassword'
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile"

import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute"

window.localStorage.setItem('sizeCounter', 0);

function App() {

  return (

        <Router>
          <Navbar />
          <Routes style={{ flex: 1 }}>
            <Route path='/' exact element={ <Home /> }/>
            <Route path='/about-us' element={ <AboutUs /> }/>
            <Route path='/contact-us' element={ <ContactUs /> }/>
          </Routes>
          <AuthProvider>
            <Routes>
              <Route exact path = '/widget-page' element= {<PrivateRoute/>}>
                <Route exact path='/widget-page' element={ <WidgetPage /> }/>
              </Route>   
            </Routes> 
          </AuthProvider>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <AuthProvider>
                  <Routes>
                    <Route path='/sign-up' element={ <Signup /> }/>
                    <Route path='/log-in' element={ <Login /> }/>
                    <Route path='/forgot-password' element={ <ForgotPassword /> }/>
                    <Route path = '/profile' element= {<PrivateRoute/>}>
                      <Route path='/profile' element={ <Profile/> }/>
                    </Route>
                    <Route path = '/update-profile' element= {<PrivateRoute/>}>
                      <Route path='/update-profile' element={ <UpdateProfile/> }/>
                    </Route>
                  </Routes>
                </AuthProvider>
            </div>
          </Container>
          <Footer />
        </Router>
    ); 
}


export default App;
