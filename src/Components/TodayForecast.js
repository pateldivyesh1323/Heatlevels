import React, { useEffect,useState } from 'react'

export default function TodayForecast(props) {

    const [today,setToday] = useState([]);

    useEffect(() => {
        todayForecast(props.lat, props.lon);
    }, [props.lat, props.lon])

    const todayForecast = async (lat, lon) => {
        if (lat === 91 && lon === 181) {
            return;
        }
        else {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=daba80bd96939a26f9d93fd2cf4308fe&units=metric`;
            const foreCast = await fetch(url);
            const parsedForeCast = await foreCast.json();
            let data = parsedForeCast.list.filter((element,index)=>{
                // eslint-disable-next-line
                return index>1 && index<7;
            })
            setToday(data);
        }
    }
    
    const getDate=(date)=>{
        return date.slice(10);
    }

    const farenheit = (temp) => {
        const ans = ((temp * 9 / 5) + 32).toString();
        return Math.ceil(ans);
      }
    
      const celcius = (temp) => {
        return Math.ceil(temp);
      }

    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className='todayForecast'>
            <div className="todTitle">12-Hours ForeCast</div>
            <div className="todayCont">
            <div className='todayBox'>
                {today && today.map((element,index)=>{
                    return(<div className='todayItems' key={index}>
                        <div className="todayDate">{getDate(element.dt_txt)} </div>
                        <div className="todayImageCont"><img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="Weather Icon" className='todImages' /></div>
                        <div className="todayWeather">{element.weather[0].main}</div>
                        <div className="todayTemp">{celcius(element.main.temp)}°C/{farenheit(element.main.temp)}°F</div>
                    </div>)
                })}
            </div>
            </div>  
        </div></div>
    )
}
