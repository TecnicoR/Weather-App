import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "Puri",
      time: "",
      temperature: 0,
      weatherType: "",
      humidity: 0,
      feelsLike: 0,
      wind: 0,
      wind_direction: "",
      region: "",
      lat: 0,
      lon: 0,
      time_zone: "",
      local_time: "",
    };
  }
  componentDidMount() {
    this.getData("Puri");
  }
  getData = (value) => {
    fetch(
      "http://api.weatherstack.com/current?access_key=04aedaa0aee4dd0d5abd82c46fce8755&query=" +
        value
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          city: value,
          time: json.current.observation_time,
          temperature: json.current.temperature,
          weatherType: json.current.weather_descriptions[0],
          humidity: json.current.humidity,
          feelsLike: json.current.feelslike,
          wind: json.current.wind_speed,
          wind_direction: json.current.wind_dir,
          region: json.location.region,
          lat: json.location.lat,
          lon: json.location.lon,
          time_zone: json.location.timezone_id,
          local_time: json.location.localtime,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <img src="./w.png" alt="" />
        <span
          className="city"
          onClick={() => {
            this.getData("Bangalore");
          }}
        >
          Bangalore
        </span>
        <span
          className="city"
          onClick={() => {
            this.getData("Delhi");
          }}
        >
          Delhi
        </span>
        <span
          className="city"
          onClick={() => {
            this.getData("Puri");
          }}
        >
          Puri
        </span>
        <div className="weather-info">
          <div className="weather-info-left">
            <div className="weather-info-left-lside">
              <span className="primary-text">{this.state.city}</span>
              <span className="secondary-text mb-30">
                As of {this.state.time}
              </span>

              <span className="temp-text mb-30">{this.state.temperature}</span>

              <span className="primary-text">{this.state.weatherType}</span>
              <span className="secondary-text">
                42% chance of rain until 12:30
              </span>
            </div>

            <div className="weather-info-left-rside">
              <span className="primary-text">{this.state.humidity}</span>
              <span className="secondary-text mb-30">Humidiy</span>

              <span className="primary-text">{this.state.feelsLike}</span>
              <span className="secondary-text mb-30">Feels Like</span>

              <span className="primary-text">
                {this.state.wind} {this.state.wind_direction}
              </span>
              <span className="secondary-text">Wind</span>
            </div>
          </div>
          <div className="weather-info-right">
            <div className="weather-info-right-lside">
              <span className="primary-text">
                {this.state.city} {this.state.region}
              </span>
              <span className="secondary-text mb-30">Details</span>

              <span className="primary-text">
                {this.state.lat},{this.state.lon}
              </span>
              <span className="secondary-text mb-30">Co-ordinates</span>

              <span className="primary-text">{this.state.time_zone}</span>
              <span className="secondary-text">Time Zone</span>
            </div>
            <div className="weather-info-right-rside">
              <span className="primary-text date-time-text">
                {this.state.local_time}
              </span>
              <span className="secondary-text">Local time</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
