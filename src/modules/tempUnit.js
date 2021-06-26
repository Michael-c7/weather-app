/*
temperature in Celsius,
and wind speed in meter/sec === metric

For temperature in Fahrenheit,
wind speed in miles/hour === imperial

Temperature in Kelvin,
wind speed in meter/sec === standard

source : https://openweathermap.org/api/one-call-api#data
*/


// imports
import {getWeatherData, getLatLong } from "./search";
// need to change the weather request(w/ the specified unit)
// then update the DOM(send the request)

// cache the DOM
const tempChange = document.querySelector(".temp-change");


export const getTemp = _ => {
    // metric is the default(for this program not the api)
    let tempToExport = "metric";

    tempChange.addEventListener("click", event => {
        let closesetBtn = event.target.closest("button");
        selectTemp(closesetBtn)

        tempToExport = closesetBtn.getAttribute("data-temp");
        
        //updateWeather()
        console.log(tempToExport);
    });

    return tempToExport;
}


let selectTemp = closesetBtn => {
    // remove selected class from every item
    Array.from(tempChange.children)
    .forEach(item => item.classList.remove("temp-change__btn--selected"));
    // add selected class to the item you selected
    closesetBtn.classList.add("temp-change__btn--selected");
}


// const changeTemp = _ => {
    
    
// }