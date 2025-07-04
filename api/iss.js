function getDataFromApi() {
    return fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json());
}

