//Set date inputs as variables
const airDate = d3.select("#date-input");
const airDateType = d3.select("#date-type");

//Function to run code
function runAir() {
    //Set date value to a variable
    const airDateValue = airDate.property("value");

    //Read in csv data
    d3.json(`https://covid19bootcampproject3.herokuapp.com/air_quality/${airDateValue}`, airData => {

        //Parse through data
        airData.forEach(d => {
            d.observation_count = +d.observation_count
        });

        //Set seperate objects for each parameter
        const CO = airData.filter(d => d.parameter === "Carbon monoxide");
        const O3 = airData.filter(d => d.parameter === "Ozone");
        const NO2 = airData.filter(d => d.parameter === "Nitrogen dioxide (NO2)");
        const SO2 = airData.filter(d => d.parameter === "Sulfur dioxide");

        //Create initial heatmap layers
        //Set array for each parameter
        let COArr = [];
        let O3Arr = [];
        let NO2Arr = [];
        let SO2Arr = [];
        //Add lat lngs to the arrays
        CO.forEach(d => {COArr.push([d.latitude, d.longitude, d.observation_count])});
        O3.forEach(d => {O3Arr.push([d.latitude, d.longitude, d.observation_count])});
        NO2.forEach(d => {NO2Arr.push([d.latitude, d.longitude, d.observation_count])});
        SO3.forEach(d => {SO3Arr.push([d.latitude, d.longitude, d.observation_count])});

        //Create initial heatmap layers
        let COLayer = L.heatLayer(COArr, {radius:50, blur:30});
        let O3Layer = L.heatLayer(O3Arr, {radius:50, blur:30});
        let NO2Layer = L.heatLayer(NO2Arr, {radius:50, blur:30});
        let SO2Layer = L.heatLayer(SO2Arr, {radius:50, blur:30});

        //Set base layer for the map
        let baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "streets-v11",
            accessToken: API_KEY
            });
        
        //Create Map
        let myMap = L.map("weather-heatmap", {
            center: [39.50, -98.35],
            zoom: 4,
            layers: [baseLayer, SO2Layer]
        });

        //Set Overlay Layers
        let overlayMaps = {
            "Sulfur Dioxide (ppb)": SO2Layer,
            "Ozone (ppm)": O3Layer,
            "Carbon Monoxide (ppm)": COLayer,
            "Nitrogen Dioxide (ppb)": NO2Layer,
        };

        //Create Layer control
        L.control.layers(overlayMaps).addTo(myMap);

        //Add legend to map
        legendAir.addTo(myMap);
    });
}
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

//Event handler to run code
airDateType.on("change.air", runAir);
airDate.on("change.air", runAir);