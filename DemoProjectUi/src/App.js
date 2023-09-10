import React from 'react'
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'

import './App.css'

export default function App() {
    return (
        <Router>
            <div>
               <Routes>
               <Route exact path="/" element={ <LandingPage /> } />
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/register" element={ <RegisterPage /> } />
                    <Route path="/home" element={ <HomePage /> } />
               </Routes>
                 
                
               
            </div>
            <Footer />
        </Router>
    )
}

const Footer = () => {
    return (
        <p className="text-center" style={ FooterStyle }>Panteon Demo Project Designed by <a href="" target="_blank" rel="noopener noreferrer">Alp Ersoy</a></p>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}
