import React, { useState, useEffect } from 'react'
import './style.css'

export default function ForeCast(props) {

  const [foreCast, setForecast] = useState([]);

  const getForecast = async (lat, lon) => {
    if (lat === 91 && lon === 181) {
      return;
    }
    else {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=daba80bd96939a26f9d93fd2cf4308fe&units=metric`;

      const foreCast = await fetch(url);
      const parsedForeCast = await foreCast.json();
      let data = parsedForeCast.list.filter((element, index) => {
        // eslint-disable-next-line
        return index >= 5 && (index===7 || index===15 || index===23 || index===31 || index===39)
      })
      setForecast(data);
    }
  }
  const farenheit = (temp) => {
    const ans = ((temp * 9 / 5) + 32).toString();
    return Math.ceil(ans);
  }

  useEffect(() => {
    getForecast(props.lat, props.lon);
  }, [props.lat, props.lon])

  const getDate = (date) => {
    return date.slice(0, 10);
  }
  const celcius = (temp) => {
    return Math.ceil(temp);
  }

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div className='foreCastContainer'>
      <div className="foreTitle">5-Days Forecast</div>
      <div className="foreCont">
        <div>
          <div className="foreBox">
            {foreCast && foreCast.map((element, index) => {
              return (<div className='foreItem' key={index}><div className="foreDate">{getDate(element.dt_txt)} </div>
                <div className="todayImageCont"><img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="Weather Icon" className='foreImages'/></div>
                <div className="foreWeather">{element.weather[0].main}</div>
                <div className="foreTemp">{celcius(element.main.temp)}°C/{farenheit(element.main.temp)}°F</div></div>)
            })}
          </div></div>
      </div>
    </div></div>
  )
}
