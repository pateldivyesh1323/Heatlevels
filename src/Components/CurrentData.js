import React, { useEffect } from 'react'
import './style.css'
import placeholder from './Images/placeholder.png'
import thermometer from './Images/thermometer.png'
import humidity from './Images/humidity.png'
import north from './Images/north.png'
import gauge from './Images/gauge.png'
import wind from './Images/wind.png'
import aqi from './Images/aqi.png'
import { useState } from 'react'

export default function CurrentData(props) {

  const apikey = "daba80bd96939a26f9d93fd2cf4308fe";
  const [current, setCurrent] = useState({ iconUrl: "02d", temp: "", feels_like: "", weather: "", humidity: "", pressure: "", windSpeed: "", windDir: "", min: "", max: "", dt: "",sunrise:"",sunset:"",airQuality:"" });


  const currentData = async (lat, lon) => {
    if (lat === 91 && lon === 181) {
      return;
    }
    else {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
      const currWeather = await fetch(url);
      const parsedCurrWeather = await currWeather.json();
      const airPollUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=daba80bd96939a26f9d93fd2cf4308fe`;
      const airPoll = await fetch(airPollUrl);
      const parsedAirPoll = await airPoll.json();


      setCurrent({ city: parsedCurrWeather.name, country: parsedCurrWeather.sys.country, iconUrl: parsedCurrWeather.weather[0].icon, temp: parsedCurrWeather.main.temp, feels_like: parsedCurrWeather.main.feels_like, weather: parsedCurrWeather.weather[0].main, humidity: parsedCurrWeather.main.humidity, pressure: parsedCurrWeather.main.pressure, windSpeed: parsedCurrWeather.wind.speed, windDir: parsedCurrWeather.wind.deg, min: parsedCurrWeather.main.temp_min, max: parsedCurrWeather.main.temp_max, dt: parsedCurrWeather.dt,sunrise:parsedCurrWeather.sys.sunrise,sunset:parsedCurrWeather.sys.sunset,airQuality:parsedAirPoll.list[0].main.aqi})
    }
  }

  useEffect(() => {
    currentData(props.lat, props.lon);
  }, [props.lat, props.lon])

  const farenheit = (temp) => {
    const ans = ((temp * 9 / 5) + 32).toString();
    return Math.ceil(ans);
  }

  const celcius = (temp) => {
    return Math.ceil(temp);
  }

  const getTime = (unix) => {
    let date = new Date(unix*1000);
    let newDate = (date.toDateString());
    let time = (date.toLocaleTimeString());
    let ans  = "Local Date and Time: " + newDate +" | "+ time;
    return ans;
  }

  const sunTime=(unix)=>{
    let date = new Date(unix*1000);
    let time = (date.toLocaleTimeString());
    return time;
  }

  const aqiCon = { 1: "Good", 2: "Fair", 3: "Moderate", 4: "Poor", 5: "Very Poor" };

  return (
    <>
      <div className='CurrentData'>
        <div className='topBar'><div className="currcityname"><img className='placeHolder' src={placeholder} alt="Location" /> {props.city}, {props.country}</div></div>
        <div className="currLastUpdated">{getTime(current.dt)}</div>
        <div className="currContainer">
          <div className="currLeftBox">
            <div className="currLeftBox1"><img className='currImage' src={`https://openweathermap.org/img/wn/${current.iconUrl}@2x.png`} alt="Weather Icon" /> {current.weather} </div>
            <div className='currLeftBox2'><div className="currTemp"> <img className='thermometer' src={thermometer} alt="Temperature" />{celcius(current.temp)}°C/{farenheit(current.temp)}°F</div>
              <div className='currFeelsLike'>Feels Like: {celcius(current.feels_like)}°C/{farenheit(current.feels_like)}°F</div><div className='currMinMax'>Max: {celcius(current.max)}°C/{farenheit(current.max)}°F | Min: {celcius(current.min)}°C/{farenheit(current.min)}°F</div>
              <div className="currSunrise">Sunrise: {sunTime(current.sunrise)} | Sunset: {sunTime(current.sunset)}</div></div>
          </div>
          <div className="currRightBox">
            <div className="currData"><img className='currDataIcon' src={gauge} alt="" />Pressure: {current.pressure}hPa</div>
            <div className="currData"><img className='currDataIcon' src={humidity} alt="" />Humidity: {current.humidity}%</div>
            <div className="currData"><img className='currDataIcon' src={north} alt="" />Wind-Direction: {current.windDir}°</div>
            <div className="currData"><img className='currDataIcon' src={wind} alt="" />Wind-Speed: {current.windSpeed}m/s</div>
            <div className="currData"><img className='currDataIcon' src={aqi} alt="" />AQI: {aqiCon[current.airQuality]}</div>
          </div>
        </div>
      </div>
    </>
  )
}

