let map;
let marker;
let polyline;
let setIntervalId = null;
let setIntervalCity = null;
const latlngs = [];

let countryCoords = "Connexion en cours...";

let issLat = 0;   
let issLong = 0;  

const latitude = document.querySelector('#latitude');
const longitude = document.querySelector('#longitude');
const button = document.querySelector('.button');
const localisationCity = document.querySelector('.localisation');

button.addEventListener('click', () => {
    if (!setIntervalId) {
        issTracker();
        setIntervalId = setInterval(issTracker, 5000);

        // on passe une fonction anonyme à setInterval :
        setIntervalCity = setInterval(() => {
            CityFromCoords({ lat: issLat, lng: issLong });
        }, 5000);

        button.innerHTML = 'Arrêter de suivre l\'ISS';
    } else {
        clearInterval(setIntervalId);
        setIntervalId = null;

        // On pense aussi à arrêter l'autre intervalle
        if (setIntervalCity) {
            clearInterval(setIntervalCity);
            setIntervalCity = null;
        }

        button.innerHTML = 'Suivre l\'ISS';
        latitude.innerHTML = "Suivi arrêté";
        longitude.innerHTML = "Suivi arrêté";
        marker.bindPopup(`Coordonnees ISS : <br> Suivi arrêté`).openPopup();
    }
});

function initMap(lat, long) {
    const iconISS = L.icon({
        iconUrl: 'media/iconISS.png',
        iconSize: [42, 42],
    });
    map = L.map('map').setView([lat, long], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    marker = L.marker([lat, long], { icon: iconISS }).addTo(map);

    countryCoords = CityFromCoords({ lat: issLat, lng: issLong });


    marker.bindPopup(`Coordonnées ISS : <br> Latitude: ${lat}, Longitude: ${long} <br> Lieu : ${countryCoords}`).openPopup();

    latlngs.push([lat, long]);
    polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
}

function updateMarker(lat, long) {
    marker.setLatLng([lat, long]);
    marker.setPopupContent(`Coordonnées ISS : <br> Latitude: ${lat}, Longitude: ${long} <br> Lieu : ${countryCoords}`);
    latlngs.push([lat, long]);
    polyline.setLatLngs(latlngs);
}

function issTracker() {
    getDataFromApi().then(data => {
        // mise à jour des variables globales
        issLat = parseFloat(data.iss_position.latitude);
        issLong = parseFloat(data.iss_position.longitude);
        console.log("Position ISS :", "lat", issLat, "long", issLong);

        if (!map) {
            initMap(issLat, issLong);

        } else {
            updateMarker(issLat, issLong);
        }

        latitude.innerHTML = issLat.toFixed(6);
        longitude.innerHTML = issLong.toFixed(6);
        localisationCity.innerHTML = countryCoords;
    }).catch(err => {
        console.error("Erreur lors de la récupération des données ISS :", err);
    });
}

function CityFromCoords(coords) {
    fetchCityFromCoords(coords).then(country => {

        countryCoords = country;
        localisationCity.innerHTML = country;
        console.log("Localisation de l'ISS :", country);
    }).catch(err => {
        console.error("Erreur lors de la récupération de la ville :", err);
        localisationCity.innerHTML = "Connexion en cours...";
        marker.setPopupContent(`Coordonnées ISS : <br> Latitude: ${lat}, Longitude: ${long} <br> Lieu :`, err);
    });
}
