import './style.scss';
// import printMe from './print';
import {initSearch} from "./modules/search";



initSearch()






/*TODO list of features to add
    - get change unit module working
      - can change between imperial(default) or metric
      - will have to set the city that they choose to local storage
      - and when you make a request
      (specificly w/ unit or lang get that city from local storage)


    - error handling for when someone types in nonsense into the search bar
        - if no response in under 30 seconds remove the loading class
        - add a thing the pop down from the
          top of the screen saying your search was invalid
          goes away after 10 seconds automatically or can close out w/ X btn)

    - create a change langauge dropdown
      - google translate or some langauge api
*/