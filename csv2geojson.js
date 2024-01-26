// Importez la bibliothèque PapaParse
const Papa = require('papaparse');
const fs = require('fs');

// Lisez le contenu du fichier CSV
const csvData = fs.readFileSync('votre_fichier.csv', 'utf8');

// Analysez le CSV en utilisant PapaParse
Papa.parse(csvData, {
  header: true,  // Si la première ligne du CSV contient des en-têtes de colonne
  dynamicTyping: true,  // Convertir les valeurs en types appropriés (nombre, chaîne, etc.)
  complete: function(results) {
    // results.data contient les données du CSV
    const geojsonFeatures = results.data.map(row => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)]
        },
        properties: {
          name: row.name,
          address: row.address,
          // Ajoutez d'autres propriétés selon vos besoins
        }
      };
    });

    const geojson = {
      type: 'FeatureCollection',
      features: geojsonFeatures
    };

    // Convertissez l'objet GeoJSON en chaîne JSON et enregistrez-le dans un fichier
    const geojsonString = JSON.stringify(geojson, null, 2);
    fs.writeFileSync('output.geojson', geojsonString, 'utf8');

    console.log('Conversion CSV vers GeoJSON terminée.');
  }
});
