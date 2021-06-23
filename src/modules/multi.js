// cache the DOM
const forecastSummaryIcon = document.querySelector(".forecast__summary__icon");
const forecastSummaryDetails = document.querySelector(".current-details");
const forecastTemp = document.querySelector(".current-forecast__temp span");
const forecastWind = document.querySelector(".data-wind");
const forecastHumidity = document.querySelector(".data-humidity");
const forecastPrecipitation = document.querySelector(".data-precipitation");

export let multidayForecast = _ => {
    /*get more specific weather info when you click on a forecast*/
    weekForecastItems.addEventListener("click", event => {
        let closestLi = event.target.closest("li");
        let weatherDayIndex = closestLi.getAttribute("data-weatherDayIndex");
        let currentDayWeatherData = daily[weatherDayIndex];
        // weather data
        let { wind_speed, humidity, dew_point } = currentDayWeatherData;
        let { day:temp } = currentDayWeatherData.temp;
        let { icon, description } = currentDayWeatherData.weather[0];


        let render = _ => {
            forecastSummaryIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            forecastSummaryDetails.innerHTML = description;
            forecastTemp.innerHTML = Math.round(temp);
            forecastWind.innerHTML = wind_speed + "mph";
            forecastHumidity.innerHTML = humidity + "%";
            forecastPrecipitation.innerHTML = Math.round(dew_point) + "DP";
        }

        let selectCurrentWeeklyForecast = _ => {
        // remove selected class from every item
        Array.from(document.querySelector(".week-forecast__items").children)
        .forEach(item => item.classList.remove("week-forecast__item--selected"));
        // add selected class to the item you selected
        closestLi.classList.add("week-forecast__item--selected");
        }


        render()
        selectCurrentWeeklyForecast()
    });
}