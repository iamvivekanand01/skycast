import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (city) fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQualityData(response.data.list[0]);
    } catch (err) {
      console.error("Error fetching air quality data:", err);
      setError("Failed to fetch air quality data.");
    }
  };

  const fetchFiveDayForecast = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setFiveDayForecast(response.data);
    } catch (err) {
      console.error("Error fetching 5-day forecast:", err);
      setError("Failed to fetch 5-day forecast.");
    }
  };

  const fetchWeatherData = async (city) => {
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message || "City not found.");
        setWeatherData(null);
        setAirQualityData(null);
        setFiveDayForecast(null);
        return;
      }

      setWeatherData(data);
      fetchAirQualityData(data.coord.lat, data.coord.lon);
      fetchFiveDayForecast(city);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data.");
    }
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white p-4">
    <Navbar onSearch={handleSearch} />

    {error && (
      <div className="text-red-500 text-center mt-4 font-semibold">
        {error}
      </div>
    )}

    {weatherData && airQualityData && (
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <div className="glass-card">
              <MainWeatherCard weatherData={weatherData} />
            </div>

            <div className="glass-card">
              <h2 className="text-xl font-semibold mb-2">5 Days Forecast</h2>
              {fiveDayForecast && (
                <FiveDayForecast forecastData={fiveDayForecast} />
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="glass-card">
              <TodayHighlights
                weatherData={weatherData}
                airQualityData={airQualityData}
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default App;
