import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import axios from 'axios';

import './App.css';

const apiKey = 'f47d4f545dbec124986ae15ba8de1f30';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
   //1.definieer functie
   async function fetchData() {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
      setError(false);      
      setWeatherData(result.data);
    } catch (e) {
      console.error(e);
      setError(true);
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
          {error && (
          <span className="wrong-location-error">Oeps! Deze locatie ken ik niet!</span>)}

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
            <ForecastTab coordinates={weatherData && weatherData.coord}/>
          </div>
        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
