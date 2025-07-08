let map; //Import des differents variable du projets
let marker;
let polyline;  
let setIntervalId = null;
const latlngs = []; // tableau pour stocker les coordonnées de l'ISS (polyline)


const latitude = document.querySelector('#latitude'); // Import des éléments HTML
const longitude = document.querySelector('#longitude');
const button = document.querySelector('.button');


button.addEventListener('click', () => { // Si on click sur le bouton
    if (!setIntervalId) { // Si le suivi n'est pas en cours
        issTracker(); // appel fonction 
        setIntervalId = setInterval(issTracker, 3000); // appel de la fonction toutes les 3 secondes
        button.innerHTML = 'Arrêter de suivre l\'ISS'; // on remplace le texte du bouton
    } else { // Si le suivi est en cours
        clearInterval(setIntervalId); // on arrête le suivi tte les 3 sec
        setIntervalId = null;
        button.innerHTML = 'Suivre l\'ISS'; // on change les textes au besoin
        latitude.innerHTML = "Suivi arrêté";
        longitude.innerHTML = "Suivi arrêté";
        marker.bindPopup(`Coordonnees ISS : <br> Suivi arrêté`).openPopup(); // + la popup
    }
});

function initMap(lat, long) { // pour initialiser la map
    const iconISS = L.icon({ // Création de l'icône pour l'ISS
        iconUrl: 'media/iconISS.png',
        iconSize: [42, 42],
    });
    map = L.map('map').setView([lat, long], 3); // Initialisation de la map avec la latitude et longitude de l'ISS

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map); // import pour la carte OpenStreetMap

    marker = L.marker([lat, long], { icon: iconISS }).addTo(map); // Création du marqueur pour l'ISS
    marker.bindPopup(`Coordonnees ISS : <br> Latitude: ${lat}, Longitude: ${long}`).openPopup(); // Ajout de la popup au marqueur

    latlngs.push([lat, long]); // Ajout des coordonnées initiales dans le tableau latlngs
    polyline = L.polyline(latlngs, { color: 'red' }).addTo(map); // Création de la polyline pour tracer le chemin de l'ISS
}

function updateMarker(lat, long) { // Fonction pour mettre à jour la position du marqueur et de la polyline sans réinitialiser la map
    marker.setLatLng([lat, long]); // Mise à jour de la position du marqueur
    marker.setPopupContent(`Coordonnées ISS : <br> Latitude: ${lat}, Longitude: ${long}`); // Mise à jour du contenu de la popup

    latlngs.push([lat, long]); // Ajout des nouvelles coordonnées dans le tableau latlngs
    polyline.setLatLngs(latlngs); // Mise à jour de la polyline avec les nouvelles coordonnées

}

function issTracker() { // Fonction pour suivre l'ISS
    getDataFromApi().then(data => { // gestion des données de l'API
        const issLat = parseFloat(data.iss_position.latitude); // Récupération de la latitude
        const issLong = parseFloat(data.iss_position.longitude); // Récupération de la longitude
        console.log("Position ISS :", "lat", issLat, "long", issLong);

        if (!map) { // Si la map n'est pas encore initialisée
            initMap(issLat, issLong);
        } else { // Si la map est déjà initialisée
            updateMarker(issLat, issLong);
        }

        latitude.innerHTML = issLat.toFixed(6); // Affichage de la latitude et longitude dans le HTML
        longitude.innerHTML = issLong.toFixed(6);


        // Projet non aboutie pour localisation de l'ISS par rapportt à une ville/pays
        //
        //
        // fetchCityFromCoords( { lat: issLat, lng: issLong }).then(data => {
        //     const city = data.address.country || "Localisation inconnue";
        //     marker.bindPopup(`Coordonnees ISS : <br> Latitude: ${issLat.toFixed(6)}, Longitude: ${issLong.toFixed(6)}<br> Ville: ${city}`).openPopup();
        // })


    }).catch(err => {
        console.error("Erreur lors de la récupération des données ISS :", err); // Gestion des erreurs
    });
}


