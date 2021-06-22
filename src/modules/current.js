let currentWeather;

// cache the DOM
const forecastSummaryIcon = document.querySelector(".forecast__summary__icon");
const forecastSummaryDetails = document.querySelector(".current-details");
const forecastTemp = document.querySelector(".current-forecast__temp span");
const forecastWind = document.querySelector(".data-wind");
const forecastHumidity = document.querySelector(".data-humidity");
const forecastPrecipitation = document.querySelector(".data-precipitation");



export const setCurrentWeather = newWeather => {
    currentWeather = newWeather;

    render();
}

const render = _ => {
    const { temp, humidity, wind_speed, dew_point } = currentWeather;
    const { icon, description } = currentWeather.weather[0];
    console.log(currentWeather)

    forecastSummaryIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    forecastSummaryDetails.innerHTML = description;

    forecastTemp.innerHTML = Math.round(temp);
    forecastWind.innerHTML = wind_speed + "mph";
    forecastHumidity.innerHTML = humidity + "%";
    forecastPrecipitation.innerHTML = Math.round(dew_point) + "DP";

    /*
    icons from the weather api
    https://openweathermap.org/img/wn/${iconCodeHere}@2x.png

    EG:
    https://openweathermap.org/img/wn/01d@2x.png
    */
}