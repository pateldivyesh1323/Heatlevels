import React from 'react'
import {useNavigate  } from 'react-router-dom'
import './style.css'

export default function DialogBox({cityFun}) {

  const navigate = useNavigate();

  const handleClick=()=>{
    let searchKey = document.getElementsByClassName("dSearchInput")[0].value;
    cityFun(searchKey);
    navigate("/weather");
  }

  const handleLocationClick=()=>{
    cityFun("");
    navigate("/weather");
  }

  const keyDown=(evt)=>{
    if(evt.code === "Enter")
    {
      handleClick();
    }
  }

  return (
    <div className='dialogBox'>
      <div className="dialog">
        <div className="dInfo">You can search the weather conditions with the name of City or else you can also get weather for your location directly you just need to allow location permission.</div>
        <div className="dSearchByCity">
          <input type="text" className='dSearchInput' placeholder='Get Location by City' minLength={2}/>
          <button className='dSearchButton' onKeyDown={keyDown} onClick={handleClick}>Get Weather</button>
        </div>
        <div className='or'>or</div>
        <div className='dLocation'>
          <button className='dSearchButton' onClick={handleLocationClick}>Get Weather for Your Location</button>
        </div>
      </div>
    </div>
  )
}