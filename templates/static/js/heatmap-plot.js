//Create selector for date input
const dateInput = d3.select("#date-input");

//function to convert data date to date object
const parseTime = d3.timeParse("%m/%e/%y");
//function to format date object to input date format
const formatTime = d3.timeFormat("%Y-%m-%d");

//Read in infection & death data
d3.csv("data/county_clean.csv", infectionData => {
    //Parse through data
    infectionData.forEach(d => {
        d.date = formatTime(parseTime(d.date));
        d.cases = +d.cases;
        d.deaths = +d.deaths;
    });
    //Initial filter for data
    let dataFiltered = infectionData.filter(d => d.date === "2020-05-25");

    //Create data arrays for heatmap layers
    let infectionArr = [];
    let deathArr = [];
    //Iterate through filtered data to append data arrays
    dataFiltered.forEach(d => {
        infectionArr.push([d.lat, d.long, d.cases]);
        deathArr.push([d.lat, d.long, d.deaths]);
    });

    //Create Heatmap layers
    let infectionLayer = L.heatLayer(infectionArr);
    let deathLayer = L.heatLayer(deathArr);

    //Set base layer for the map
    const baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
        });

    //create map
    const myMap = L.map("infection-heatmap", {
        center: [39.50, -98.35],
        zoom: 4,
        layers: [baseLayer, infectionLayer]
    });

    //Set Overlay Layers
    const overlayMaps = {
        Infections: infectionLayer,
        Deaths: deathLayer
    };

    //Create Layer control
    L.control.layers(overlayMaps).addTo(myMap);

    //Add legend to map
    legend.addTo(myMap);

    //Function to redraw heatmap
    function renderHeatmap() {
        //Grab input value
        const dateValue = dateInput.property("value");
        
        //Refilter data
        dataFiltered = infectionData.filter(d => d.date === dateValue);
        
        //Reset data arrays for heatmap layers
        let infectionArr = [];
        let deathArr = [];
        //Iterate through filtered data to append data arrays
        dataFiltered.forEach(d => {
            infectionArr.push([d.lat, d.long, d.cases]);
            deathArr.push([d.lat, d.long, d.deaths]);
        });
        //Reset the layers and redraw
        infectionLayer.setLatLngs(infectionArr);
        deathLayer.setLatLngs(deathArr);
    }

    //Event handler to change heatmap on user input
    dateInput.on("change", renderHeatmap);
});

//Create legend for the map
const legend = L.control({position: "bottomleft"});
//Function to add legend to map
legend.onAdd = function (map) {
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