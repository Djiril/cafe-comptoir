// script.js
var map = L.map('map').setView([48.8529555, 2.3479954], 13);

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    attribution: '© OpenStreetMap contributors'
//}).addTo(map);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri'
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
