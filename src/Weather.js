import React, { useState } from "react";
import "./App.css";
require("dotenv").config({ path: __dirname + "/.env" });

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };
  const dateMaker = (e) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 17
            ? weather.main.temp > 25
              ? "App warm-hi"
              : "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            placeholder="Search"
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}{" "}
              </div>
              <div className="date">{dateMaker(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}
                <sup>°</sup>C{" "}
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="temp-info">
                <div className="weather-feel">
                  Feels-like:{" "}
                  <span className="feels-like">
                    {Math.floor(weather.main.feels_like)}
                  </span>
                  <sup>°</sup>C
                </div>
                <div className="divider">|</div>
                <div className="weather-min">
                  Min-Temp:{" "}
                  <span className="min-temp">
                    {Math.floor(weather.main.temp_min)}
                  </span>
                  <sup>°</sup>C
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Weather;
