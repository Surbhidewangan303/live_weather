import React,{useEffect, useState} from 'react'
import "./style.css";
import Card from './card';



const Temp = () => {

    const [searchValue,setSearchValue]=useState("Pune");

    const[tempInfo, setTempInfo]=useState({});

    const getWeatherInfo=async()=>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3a3955de81a8ab67918b95d7144b37bc`;
            let res = await fetch(url);
            let data = await res.json();

            //showing the data
            
           const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const weatherInfoFromAPI={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,

            }
            setTempInfo(weatherInfoFromAPI);
  
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getWeatherInfo();
    });
  return (
    <>
        <div className="wrap">
            <div className='search'>
                <input type="search"  
                    placeholder='Search City.. ' 
                    autoFocus id="search" 
                    className='searchTerm'
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}>
                </input>
                <button className='searchButton' 
                    type="button" 
                    onClick={getWeatherInfo}
                >Search</button>
            </div>
        </div>
        
        <Card tempInfo{...tempInfo}/>
    </>
  )
}

export default Temp