// script.js
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Charger les données des cafés depuis un fichier JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.cafes.forEach(cafe => {
            L.marker([cafe.lat, cafe.lng]).addTo(map)
                .bindPopup(cafe.name);
        });
    });
