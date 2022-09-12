import { async } from "regenerator-runtime";

//this free google API key has limited use;
//for full functionality, setup billing account on google and get full-featured free API key
//then replace the key used below
const GOOGLE_API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';

//this function will only work properly with full-featured free API key
export async function getAddressFromCoords(coordinates) {

    //to use the google API inside this function I must setup billing account which must be duly approved by google
    //Therefore, the GOOGLE_API_KEY will not work for this funcltion
    //'response' from this 'fetch()' will not return the required object 
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`);

    if(!response.ok) {
        throw new Error('Failed to fetch coordinates. Please try again');
    }

    const data = await response.json();
    console.log(data);
    if(!data.error_message) {
        throw new Error(data.error_message);
    }
    const address = data.results[0].formatted_address;
    return address;

}

export async function getCoordsFromAddress(address) {
    
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);

    if(!response.ok) {
        throw new Error('Failed to fetch coordinates. Please try again');
    }
    const data = await response.json();
    if(!data.error_message) {
        throw new Error(data.error_message);
    }

    //going by the expected JSON response from the google API
    //The longitude and latitude data are accessed as below;
    //https://developers.google.com/maps/documentation/geocoding/start
    const coordinates = data.result[0].geometry.location;
    return coordinates;
}

//