import { Map } from './UI/Map';

class LoadedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headerTitleEl = document.querySelector('hedader h1');
        headerTitleEl.textContent = address;
    }
}

//'location.href' returns the current url in the browser 
const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
    lat: parseFloat(queryParams.get('lat')),
    lat: +queryParams.get('lng'),
};
const address = queryParams.get('address');
new LoadedPlace(coords, address);