//nimport { Map } from './UI/Map';o need to import
import { Modal } from './UI/Modal'; 

import { getCoordsFromAddress, getAddressFromCoords } from './Utils/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler);
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    }

    sharePlaceHandler() {
        const sharedLinkInputEl = document.getElementById('share-link');

        if(!navigator.clipboard) {
            sharedLinkInputEl.select();
            return;
        }

        navigator.clipboard.writeText(sharedLinkInputEl)
            .then(() => {
                alert('Copied into clipboard');
            })
            .catch(err => {
                console.log(err);
                sharedLinkInputElement.select();
            });
    }

    selectPlace(coordinates, address) {
        //On second run, the
        if(this.map) {
            this.map.render(coordinates);
        } else {
            //The googlemap api link attached to the  i.e. <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg" defer></script>
            //makes the instantiatiable object "Map" globally available in this application;
            //When this file runs for the first time, a  field called 'map' for the class 'PlaceFinder'
            this.map = new Map(coordinates);
        }
        this.shareBtn.disabled = false;
        const sharedLinkInputEl = document.getElementById('share-link');
        sharedLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }

    //
    locateUserHandler() {
        if(!navigator.geolocation) {
            alert('Location feature is not available in your browser - please use a more modern browser');
            return;
        } 
        const modal = new Modal('loading-modal-content', 'loading location - please wait');
        modal.show();
        
        navigator.geolocation.getCurrentPosition(
            async successResult => {
                modal.hide();
                const coordinates = {
                    lat: successResult.coords.latitude,
                    lng: successResult.coords.longitude
                };

                //only uncomment this after setting up billing account and obtaining the correct API key from google
                //const address = await getAddressFromCoords(coordinates); 
                modal.hide();
                this.selectPlace(coordinates, address);
            },
            error => {
                modal.hide();
                alert('Could not locate you unfortunately. Please enter an address manually');
        });       
    }

    async findAddressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if(!address || address.trim().length === 0) {
            alert('Invalid address entered - please try again!');
            return;
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait');
        
        //this will display the spinner
        modal.show();
        try {
            const coordinates = await getCoordsFromAddress(address);
            this.selectPlace(coordinates, address);
        } catch(err) {
            alert(err.message)
        }
        modal.hide();
    }
}

const placeFinder = new PlaceFinder();







