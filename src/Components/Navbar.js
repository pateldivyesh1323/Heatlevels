import React from 'react'
import './style.css'
import search from './Images/search.png'

export default function Navbar({ setCity }) {

  const getCity = () => {
    let city = document.getElementsByClassName("searchCity")[0].value ? document.getElementsByClassName("searchCity")[0].value : document.getElementsByClassName("searchCity")[1].value;
    setCity(city);
    city = "";
  }

  const handleClick = () => {
    let expandingSearchCont = document.getElementsByClassName("expandingSearchCont")[0];
    if (expandingSearchCont.style.display === "none") {
      expandingSearchCont.style.display = "flex";
    }
    else {
      expandingSearchCont.style.display = "none";
    }
  }

  const keyDown=(evt)=>{
    if(evt.code === "Enter")
    {
      getCity();
    }
  }
  
  return (
    <div className='navbar'>
      <div className='title' style={{ display: "inline-flex", alignItems: "center" }}><img src="logo1.png" className='navLogo' alt="Weather Icon" /> Heatlevels</div>
      <div className="search"><input type="text" className="searchCity searchBox" onKeyDown={keyDown} placeholder='Search weather by City' /><button onClick={getCity} className="searchButton">Get Weather</button>
      </div><div className='searchIconCont'><img src={search} alt="Search Icon" className='searchIcon' onClick={handleClick} /></div>
      <div style={{ display: "none" }} className="expandingSearchCont"><input type="text" className="searchCity searchBox" placeholder='Search weather by City' /><button onClick={getCity} className="searchButton">Get Weather</button></div>
    </div>
  )
}
