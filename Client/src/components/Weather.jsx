import { useState } from 'react';
import { getWeatherByCity } from '../services/weatherService';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Weather Information</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{weather.name}</h3>
            <p className="card-text">
              Temperature: {weather.main.temp}°C
            </p>
            <p className="card-text">
              Humidity: {weather.main.humidity}%
            </p>
            <p className="card-text">
              Weather: {weather.weather[0].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather; 