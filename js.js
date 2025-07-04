let map;
let marker;
let polyline;  // variable globale pour la ligne
let setIntervalId = null;
const latlngs = [];

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
    marker.bindPopup(`Coordonnees ISS : <br> Latitude: ${lat}, Longitude: ${long}`).openPopup();

    latlngs.push([lat, long]);
    polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
}

function updateMarker(lat, long) {
    marker.setLatLng([lat, long]);
    marker.setPopupContent(`Coordonnées ISS : <br> Latitude: ${lat}, Longitude: ${long}`);

    latlngs.push([lat, long]);
    polyline.setLatLngs(latlngs);

}

function issTracker() {
    getDataFromApi().then(data => {
        const issLat = parseFloat(data.iss_position.latitude);
        const issLong = parseFloat(data.iss_position.longitude);
        console.log("Position ISS :", "lat", issLat, "long", issLong);

        if (!map) {
            initMap(issLat, issLong);
        } else {
            updateMarker(issLat, issLong);
        }

        latitude.innerHTML = issLat.toFixed(6);
        longitude.innerHTML = issLong.toFixed(6);
    }).catch(err => {
        console.error("Erreur lors de la récupération des données ISS :", err);
    });
}

const latitude = document.querySelector('#latitude');
const longitude = document.querySelector('#longitude');
const button = document.querySelector('.button');

button.addEventListener('click', () => {
    if (!setIntervalId) {
        issTracker();
        setIntervalId = setInterval(issTracker, 3000);
        button.innerHTML = 'Arrêter de suivre l\'ISS';
    } else {
        clearInterval(setIntervalId);
        setIntervalId = null;
        button.innerHTML = 'Suivre l\'ISS';
        latitude.innerHTML = "Suivi arrêté";
        longitude.innerHTML = "Suivi arrêté";
        marker.bindPopup(`Coordonnees ISS : <br> Suivi arrêté`).openPopup();
    }
});
