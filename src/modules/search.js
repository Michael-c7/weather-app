import geocodingApiKey from "../apiKeys/geocodingApiKey";
import weatherApiKey from "../apiKeys/weatherApiKey";
import { setCurrentWeather } from "./current";
// Lat = Y Long = X

let address = "Salt Lake, UT"

let currentLocationEl = document.querySelector(".current-location");
const searchBar = document.querySelector(".search-bar");
const searchInputEl = document.querySelector(".search-bar__input");
const searchBarEl = document.querySelector(".search-bar__submit");

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
    const {lat, lon} = await getLatLong(address)
    const {current, daily} = await getWeatherData(lat, lon);
    setCurrentWeather(current)
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




let getWeatherData = async (lat, lon) => {
     let  endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&appid=${weatherApiKey}`;
     let request = await fetch(endpoint);
     let data = await request.json();
     return data;
}




const render = _ => {
    currentLocationEl.innerHTML = address;
}