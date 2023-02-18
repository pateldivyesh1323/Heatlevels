import React, { useState } from 'react'
import DialogBox from './Components/DialogBox';
import MainContent from './Components/MainContent'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {

  const [city, setCity] = useState("");

  const cityFun=(city)=>{
    setCity(city);
  }

  return (
    <div>
      <Router>
        <Navbar setCity={setCity} />
        <Routes>
          <Route exact path='*' element={<DialogBox cityFun={cityFun} />} />
          <Route exact path='/weather' element={<MainContent city={city} key={city}/>} />
        </Routes>
      </Router>
    </div>
  )
}
