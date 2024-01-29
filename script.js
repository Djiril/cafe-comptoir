// script.js
var map = L.map('map').setView([48.85, 2.34], 13);

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //  attribution: '© OpenStreetMap contributors'
//}).addTo(map);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
   attribution: '© Esri & © OpenStreetMap contributors'
}).addTo(map);

function onLocationFound(e) {
	const radius = e.accuracy / 2;

	const locationCircle = L.circle(e.latlng, radius).addTo(map);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

	map.locate({setView: true, maxZoom: 16});


// Charger les données des cafés depuis un fichier JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Ajouter une couche GeoJSON à la carte
        L.geoJSON(data, {
          onEachFeature: function (feature, layer) {
		  if(${feature.properties.Status} == "Publié")
	    {
            layer.bindPopup(`
              <h2>${feature.properties.Name}</h2>
              <p>${feature.properties.Adresse}</p>
	      <img src="${feature.properties.Image1}" width="300">
	      <p>${feature.properties.Commentaires}</p>}
            `);
          }
        }).addTo(map);
      })
