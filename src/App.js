import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import axios from 'axios';
import './App.css';

const apiKey = 'f47d4f545dbec124986ae15ba8de1f30';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
   //1.definieer functie
   async function fetchData() {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
      setWeatherData(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  //2. Roep functie aan
  if (location) {
    fetchData();
  }

  //code wordt alleen afgevuurd als location veranderd
}, [location]);

  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocation={setLocation}/>

          <span className="location-details">
            { weatherData && 
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{weatherData.main.temp} &deg;</h1>
              </>
            }

          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu/>

          <div className="tab-wrapper">
            Alle inhoud van de tabbladen komt hier!
          </div>
        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
