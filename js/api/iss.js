function getDataFromApi() {
    return fetch('http://api.open-notify.org/iss-now.json') // Appel à l'api et réception d'un Json
        .then(response => response.json());
}



// Projet non aboutie pour localisation de l'ISS par rapportt à une ville/pays

// async function fetchCityFromCoords(coords) {
//     try {
//         const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`, {
//             headers: {
//                 'User-Agent': 'ISS Tracker/1.0 (https://example.com/contact)' 
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data && data.address) {
//             const {
//                 city, town, village, hamlet,
//                 city_district, region, state, country, ocean
//             } = data.address;

//             return city || town || village || hamlet || city_district || region || state || country || ocean || "Lieu inconnu";
//         }

//         return "Lieu inconnu";
//     } catch (error) {
//         console.error("Erreur lors de la récupération de la localisation :", error);
//         return "Lieu inconnu";
//     }
// }
