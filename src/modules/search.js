import geocodingApiKey from "../apiKeys/geocodingApiKey";
import weatherApiKey from "../apiKeys/weatherApiKey";
import { setCurrentWeather } from "./current";
import { setMultiWeather } from "./multi";
// Lat = Y Long = X

let address = "Salt Lake, UT"

let currentLocationEl = document.querySelector(".current-location");
const searchBar = document.querySelector(".search-bar");
const searchInputEl = document.querySelector(".search-bar__input");
const searchBarEl = document.querySelector(".search-bar__submit");
const loadingSection = document.querySelector(".loading-section");
const weekForecastItems = document.querySelector(".week-forecast__items");

export const initSearch = _ => {
    // console.log("hello, more text")
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

    console.log(daily)


    let weatherMulti = daily.slice(0, daily.length - 1).map(((item, index) => {
         let {min, max} = item.temp;
         let weatherIcon = item.weather[0].icon;
         let currentDayText = daysOfTheWeek[index];
        return {min,max,weatherIcon,currentDayText};
    }));

    let myMarkup = "";
    weatherMulti.forEach((item,index) => {
        const {min,max,weatherIcon,currentDayText} = item;
        let markup = `
        <li class="week-forecast__item">
            <img class="forecast__item__icon" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="weather icon"/>
            <div class="week-forecast__item__temp">${Math.floor(min)}/${Math.floor(max)}</div>
            <div>${currentDayText}</div>
         </li>
        `
        myMarkup += markup;
    });

    weekForecastItems.innerHTML = myMarkup;




    /*get more specific weather info when you click on a forecast*/



    // change units


    // change langauge

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