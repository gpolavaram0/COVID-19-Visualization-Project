//Read in csv data
d3.csv("data/air_quality.csv", airData => {
    //Parse through data
    airData.forEach(d => d.observation_count = +d.observation_count);

    //Set seperate objects for each parameter
    const CO = airData.filter(d => d.parameter === "Carbon monoxide");
    const O3 = airData.filter(d => d.parameter === "Ozone");
    const NO2 = airData.filter(d => d.parameter === "Nitrogen dioxide (NO2)");
    const SO2 = airData.filter(d => d.parameter === "Sulfur dioxide");

    //Set initial filter date
    const date = "2020-03-31";
    //Further filter each parameter's object
    let COFiltered = CO.filter(d => d.date_local === date);
    let O3Filtered = O3.filter(d => d.date_local === date);
    let NO2Filtered = NO2.filter(d => d.date_local === date);
    let SO2Filtered = SO2.filter(d => d.date_local === date);
    console.log(COFiltered);
    //Create initial heatmap layers
    //Set array for each parameter
    let COArr = [];
    let O3Arr = [];
    let NO2Arr = [];
    let SO2Arr = [];
    //Iterate through each parameter and push up LatLng arrays
    COFiltered.forEach(d => COArr.push([d.latitude, d.longitude, d.observation_count]));
    O3Filtered.forEach(d => O3Arr.push([d.latitude, d.longitude, d.observation_count]));
    NO2Filtered.forEach(d => NO2Arr.push([d.latitude, d.longitude, d.observation_count]));
    SO2Filtered.forEach(d => SO2Arr.push([d.latitude, d.longitude, d.observation_count]));
    //Create initial heatmap layers
    let COLayer = L.heatLayer(COArr, {radius:50, blur:30});
    let O3Layer = L.heatLayer(O3Arr, {radius:50, blur:30});
    let NO2Layer = L.heatLayer(NO2Arr, {radius:50, blur:30});
    let SO2Layer = L.heatLayer(SO2Arr, {radius:50, blur:30});

    //Set base layer for the map
    const baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
        });
    
    //Create Map
    const myMap = L.map("weather-heatmap", {
        center: [39.50, -98.35],
        zoom: 4,
        layers: [baseLayer, O3Layer]
    });

    //Set Overlay Layers
    const overlayMaps = {
        "Ozone": O3Layer,
        "Carbon Monoxide": COLayer,
        "Nitrogen Dioxide": NO2Layer,
        "Sulfur Dioxide": SO2Layer
    };

    //Create Layer control
    L.control.layers(overlayMaps).addTo(myMap);

    //Add legend to map
    legendAir.addTo(myMap);

    //Function to redraw heatmap
    function renderAir() {
        //Grab input value
        const dateValue = dateInput.property("value");
        
        //Refilter data
        COFiltered = CO.filter(d => d.date_local === dateValue);
        O3Filtered = O3.filter(d => d.date_local === dateValue);
        NO2Filtered = NO2.filter(d => d.date_local === dateValue);
        SO2Filtered = SO2.filter(d => d.date_local === dateValue);
        
        //Reset data arrays for heatmap layers
        COArr = [];
        O3Arr = [];
        NO2Arr = [];
        SO2Arr = [];
        //Iterate through filtered data to append data arrays
        COFiltered.forEach(d => COArr.push([d.latitude, d.longitude, d.observation_count]));
        O3Filtered.forEach(d => O3Arr.push([d.latitude, d.longitude, d.obersvation_count]));
        NO2Filtered.forEach(d => NO2Arr.push([d.latitude, d.longitude, d.observation_count]));
        SO2Filtered.forEach(d => SO2Arr.push([d.latitude, d.longitude, d.observation_count]));
        //Reset the layers and redraw
        COLayer.setLatLngs(COArr);
        O3Layer.setLatLngs(O3Arr);
        NO2Layer.setLatLngs(NO2Arr);
        SO2Layer.setLatLngs(SO2Arr);
    }

    //Event handler to change heatmap on user input
    dateInput.on("change", renderAir);
});

//Create legend for the map
const legendAir = L.control({position: "bottomleft"});
//Function to add legend to map
legendAir.onAdd = function (map) {
    //Div for the legend
    var div = L.DomUtil.create('div', 'legend');
        //Create labels for the legend
        const grades = ["Least", "", "", "", "Most"];
        const colors = ["blue", "cyan", "lime", "yellow", "red"];
        const labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < colors.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i>' +
            grades[i] + '<br><br>';
    }
    //return the div with label
    return div;
}   