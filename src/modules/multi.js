


let weatherList = [];

// cache the DOM
let weekForecastItems = document.querySelector(".week-forecast__items");




export const setMultiWeather = newList => {
    weatherList = newList;
    console.log("this is the multi mod")
    // render()
}

const render = _ => {
    for(let i = 0; i <= 7; i ++) {
        console.log(i)
        weekForecastItems.innerHTML = `
        <li class="week-forecast__item week-forecast__item--selected">
            <img class="forecast__item__icon" src="https://openweathermap.org/img/wn/01d@2x.png" alt="weather icon"/>
            <div class="week-forecast__item__temp">-57/-63</div>
            <div>Mon</div>
        </li>
        `
    }
}


/*
<li class="week-forecast__item week-forecast__item--selected">
    <span class="material-icons">wb_sunny</span>
    <div class="week-forecast__item__temp">-57/-63</div>
    <div>Mon</div>
</li>
*/