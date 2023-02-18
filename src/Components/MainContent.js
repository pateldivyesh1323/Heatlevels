import React, { useEffect, useState } from 'react'
import CurrentData from './CurrentData'
import ForeCast from './ForeCast'
import TodayForecast from './TodayForecast'
import './style.css'

export default function MainContent({ city }) {
    const apikey = "daba80bd96939a26f9d93fd2cf4308fe";
    const [coords, setCoords] = useState({ lat: 91, lon: 181, city: "", country: "" });

    useEffect(() => {
        if (city === "") {
            navigation();
        }
        else {
            getCoordsByCity(city);
        }

    }, [city]);

    const getCoordsByCity = async (city) => {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=daba80bd96939a26f9d93fd2cf4308fe`;
        const data = await fetch(url);
        const parsedData = await data.json();
        if (parsedData.length === 0) {
            let not = document.getElementsByClassName("notAvailable")[0];
            not.style.display = "block";
            let available = document.getElementsByClassName("MainContent")[0];
            available.style.display = "none";
        }
        else {
            const lat = parsedData[0].lat;
            const lon = parsedData[0].lon;
            setCoords({ lat: lat, lon: lon, city: parsedData[0].name, country: parsedData[0].country });
            let not = document.getElementsByClassName("notAvailable")[0];
            not.style.display = "none";
            let available = document.getElementsByClassName("MainContent")[0];
            available.style.display = "block";
        }
    }

    const navigation = () => {
        navigator.permissions.query({
            name: 'geolocation'
        }).then(function (result) {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(async function (position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
                    const data = await fetch(url);
                    const parsedCurrWeather = await data.json();
                    setCoords({ lat: lat, lon: lon, city: parsedCurrWeather.name, country: parsedCurrWeather.sys.country });
                    let not = document.getElementsByClassName("notAvailable")[0];
                    not.style.display = "none";
                    let available = document.getElementsByClassName("MainContent")[0];
                    available.style.display = "block";
                });
            }
            else if (result.state === "denied") {
                let not = document.getElementsByClassName("notAvailable")[0];
                not.style.display = "block";
                let available = document.getElementsByClassName("MainContent")[0];
                available.style.display = "none";
            }
        });
    }

    return (
        <><div className="container">
            <div className="notAvailable" style={{ display: "none", marginTop: "50px" }}>
                <div style={{ textAlign: "center", fontSize: "22px" }}>Please check city name or allow permission to get your location and try again.</div>
            </div>
            
            <div className='MainContent' style={{ display: "none" }}>
                <CurrentData lat={coords.lat} lon={coords.lon} city={coords.city} country={coords.country}/>
                <TodayForecast lat={coords.lat} lon={coords.lon}/>
                <ForeCast lat={coords.lat} lon={coords.lon}/>
            </div></div>
        </>
    )
}
