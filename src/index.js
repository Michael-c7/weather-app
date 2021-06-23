import './style.scss';
// import printMe from './print';
import {initSearch} from "./modules/search";



initSearch()





/*TODO list of features to add
    - when you click on a weekly forecast
      it replaces the main forecast w/
      more info on the forecast you clicked
        1. when a specific days weather you get an index (0-6) [X]
        2. use the index you got get the data for the specific day, [X]
        then show it
        3. have a selected class added to the currently selected day [X]
        4. remove the selected class when the day is no longer selected [X]
        5. have the first day of the week selected by default
         document.querySelector(".week-forecast__items").children[0].classList.add("week-forecast__item--selected")



    - get change unit module working

    - create a change langauge dropdown

    - tooltip on hover for what the wind speed, humidity, dew point are
        EG: The dew point is the temperature to which
            air must be cooled to become saturated with water vapor.
            When cooled further, the airborne water vapor
            will condense to form liquid water (dew).
            When air cools to its dew point through contact
            with a surface that is colder than the air,
            water will condense on the surface

    - error handling for when someone types in nonsense into the search bar
        - if no response in under 30 seconds remove the loading class
        - add a thing the pop down from the
          top of the screen saying your search was invalid
          goes away after 10 seconds automatically or can close out w/ X btn)

*/