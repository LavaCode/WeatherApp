import React, { useEffect, useState, useContext } from 'react';
import { TempContext } from '../../context/TempContextProvider';
import './ForecastTab.css';
import createDateString from '../../helpers/createDateString';
import axios from "axios";

function ForecastTab({ coordinates }) {
  const [forecasts, setForecasts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const { kelvinToMetric } = useContext(TempContext);

  useEffect(() => {
    async function fetchData() {
      toggleLoading(true);

      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
        setError(false);
        setForecasts(result.data.daily.slice(0, 5));
      } catch (e) {
        console.error(e);
        setError(true);
      }
      toggleLoading(false);
    }

    if (coordinates !== null) {
      fetchData();
    }

  }, [coordinates]);

  return (
    <div className="tab-wrapper">
      {forecasts && forecasts.map((forecast) => {
        return (
          <article className="forecast-day" key={forecast.dt}>
            <p className="day-description">
              {createDateString(forecast.dt)}
            </p>
            <section className="forecast-weather">
              <span>
                {kelvinToMetric(forecast.temp.day)}
              </span>
              <span className="weather-description">
                {forecast.weather[0].description}
              </span>
            </section>
          </article>
        )
      })}

      {!forecasts && !error && (
        <span className="no-forecast">
          Zoek eerst een locatie om het weer voor deze week te bekijken
        </span>
      )}  

      {error && <span>Oeps, we kunnen geen data ophalen!</span>}
      {loading && (<span>Loading...</span>)}
    </div>
  );
};

export default ForecastTab;
