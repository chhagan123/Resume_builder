import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { Template } from './components/Template'
import EditResume from './components/EditResume'
import Footer from './components/Footer'
// import SummaryGEn from './components/SummaryGen'

function App() {


  return (
    <>
      <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar stays at top */}
        <Navbar />

        {/* Main content grows to fill space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/template" element={<Template />} />
            <Route path="/edit" element={<EditResume />} />
          </Routes>
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </Router>
    </>
  )
}

export default App











