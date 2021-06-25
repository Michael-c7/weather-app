import './style.scss';
// import printMe from './print';
import {initSearch} from "./modules/search";



initSearch()





/*TODO list of features to add
    - tooltip on hover for what the wind speed, humidity, dew point are
        EG: The dew point is the temperature to which
            air must be cooled to become saturated with water vapor.
            When cooled further, the airborne water vapor
            will condense to form liquid water (dew).
            When air cools to its dew point through contact
            with a surface that is colder than the air,
            water will condense on the surface


    - get change unit module working
      - can change between imperial(default) or metric

    - create a change langauge dropdown
      - google translate or some langauge api


    - error handling for when someone types in nonsense into the search bar
        - if no response in under 30 seconds remove the loading class
        - add a thing the pop down from the
          top of the screen saying your search was invalid
          goes away after 10 seconds automatically or can close out w/ X btn)

*/