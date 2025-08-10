import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { Template } from './components/Template'
import EditResume from './components/EditResume'

function App() {


  return (
    <>
    <Router>
      {/* Navabr stays at the top*/}
      <Navbar/>
      {/*Routes*/}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/template" element={<Template/>}/>
        <Route path='/edit' element={<EditResume/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
