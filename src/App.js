import React, { useState, useEffect, useContext } from 'react';
import { TempContext } from './context/TempContextProvider';
import axios from 'axios';
import {
BrowserRouter as Router,
Switch,
Route } from 'react-router-dom';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import TodayTab from './pages/todayTab/TodayTab';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const { kelvinToMetric } = useContext(TempContext);

  useEffect(() => {
   //1.definieer functie
   async function fetchData() {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
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
                <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
              </>
            }
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <Router>
          <div className="weather-content">
          <TabBarMenu/>

          <div className="tab-wrapper">
            <Switch>
              <Route exact path="/">
                <TodayTab coordinates={weatherData && weatherData.coord} />
              </Route>
              <Route patch="/komende-week">
                <ForecastTab coordinates={weatherData && weatherData.coord}/>
              </Route>
            </Switch>
          </div>
        </div>
        </Router>
        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
