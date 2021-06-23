import geocodingApiKey from "../../apiKeys/geocodingApiKey";
import weatherApiKey from "../../apiKeys/weatherApiKey";
import { setCurrentWeather } from "./current";
// import { multidayForecast } from "./multi";
// Lat = Y Long = X

let address = "Salt Lake, UT"

let currentLocationEl = document.querySelector(".current-location");
const searchBar = document.querySelector(".search-bar");
const searchInputEl = document.querySelector(".search-bar__input");
const searchBarEl = document.querySelector(".search-bar__submit");
const loadingSection = document.querySelector(".loading-section");
const weekForecastItems = document.querySelector(".week-forecast__items");
// cache the DOM
const forecastSummaryIcon = document.querySelector(".forecast__summary__icon");
const forecastSummaryDetails = document.querySelector(".current-details");
const forecastTemp = document.querySelector(".current-forecast__temp span");
const forecastWind = document.querySelector(".data-wind");
const forecastHumidity = document.querySelector(".data-humidity");
const forecastPrecipitation = document.querySelector(".data-precipitation");


export const initSearch = _ => {
    bindSearchEvents()
    updateWeather(address)
    render()
}



const bindSearchEvents = _ => {
    searchBar.addEventListener("submit", event => {
        event.preventDefault();
        if(searchInputEl.value === "") return;
        address = searchInputEl.value;
        searchInputEl.value = "";
        updateWeather(address)
        render()
    });
}



const updateWeather = async query => {
    loadingSection.classList.toggle("loading-section--active");
    const {lat, lon} = await getLatLong(address)
    const {current, daily} = await getWeatherData(lat, lon);
    loadingSection.classList.toggle("loading-section--active");
    setCurrentWeather(current)

    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


    let weatherMulti = daily.slice(0, daily.length - 1).map(((item, index) => {
         let {min, max} = item.temp;
         let weatherIcon = item.weather[0].icon;
         let currentDayText = daysOfTheWeek[index];
        return {min,max,weatherIcon,currentDayText};
    }));

    let myMarkup = "";
    weatherMulti.forEach((item, index) => {
        const {min,max,weatherIcon,currentDayText} = item;
        let markup = `
        <li class="week-forecast__item" data-weatherDayIndex=${index}>
            <img class="forecast__item__icon" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="weather icon"/>
            <div class="week-forecast__item__temp">${Math.floor(min)}/${Math.floor(max)}</div>
            <div>${currentDayText}</div>
         </li>
        `
        myMarkup += markup;
    });

    weekForecastItems.innerHTML = myMarkup;



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



export let testThing = _ => {
    return "says hello"
}




let getLatLong = async (query) => {
    /*
    *For the weather api need the x and y(lat, long)
    from the address the user inputs eg: Salt lake city,UT
    */
    let endPoint = `http://api.positionstack.com/v1/forward?access_key=${geocodingApiKey}&query=${query}`;
    let request = await fetch(endPoint);
    let data = await request.json();
    return {lat: data.data[0].latitude, lon: data.data[0].longitude};
}




export let getWeatherData = async (lat, lon) => {
     let  endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&appid=${weatherApiKey}`;
     let request = await fetch(endpoint);
     let data = await request.json();
     return data;
}




const render = _ => {
    currentLocationEl.innerHTML = address;
}