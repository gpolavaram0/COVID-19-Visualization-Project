//Define geojson variable
let geojson;

//Create map
const myMap = L.map("popDen-choro", {
    center: [39.50, -98.35],
    zoom: 4,
});
//Set Base layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: 'mapbox/light-v9',
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

//Function to get color for heatmap
function getColor(d) {
    return d > 1000 ? '#014636' :
           d > 500  ? '#016c59' :
           d > 200  ? '#02818a' :
           d > 100  ? '#3690c0' :
           d > 50   ? '#67a9cf' :
           d > 20   ? '#a6bddb' :
           d > 10   ? '#d0d1e6' :
                      '#d3d5e3';
}

//Function to style the heatmap
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

//Function to create interactive popups
function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();

    info.update(layer.feature.properties);
    }
}
//Function to reset highlight on mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//Function to zoom to feature
function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(myMap);

//Set the control layer
const info = L.control();
//Set the info popup
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
//Method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};
//Add popups to map
info.addTo(myMap);