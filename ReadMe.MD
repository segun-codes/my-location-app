# Javascript Application Sample Project 
This is a simple Javascript ES6 application that provides basic scaffold features typical of a location sharing service. It can be plugged into any bigger project which requires location sharing service as one of its many components or microservices. 

## How to Run
1. Subscribe to static hosting services provider (e.g., Firebase);
2. Follow instruction on the provider website to deploy the application;
3. Load the application using the appropriate url;

## About the Application 
1. The application uses google map API to render map of current location of user;
2. Map marker is used to indicate the current location of the user on the map;
3. User current location is determined by coordinates returned from browser API;
4. Link of user current location is auto-displayed on an input field;
5. To share one's location, a user can easily copy the link (from the input field) to clipboard and share same with friends;

## NOTE: 
1. The Google API key used (in this project) to fetch to map data has some restrictions;
2. To use this application, we recommend that the Google API key used in the app be replaced with a paid version (or alternative full-featured if available) obtainable from Google;
3. Please ignore the commit comment that the Google API key has been replaced with full-featured, this isn't the case yet;