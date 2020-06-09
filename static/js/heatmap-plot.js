//Set date input to variable
const infectionDate = d3.select("#date-input");
const infectionDateType = d3.select("#date-type");

//Set base layer for the map
const baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
    });

//create map
const Map = L.map("infection-heatmap", {
    center: [39.50, -98.35],
    zoom: 4,
    layers: [baseLayer]
});

//Function to run code
function runInfection() {
    let infectionDateValue = infectionDate.property("value");

    //Read in infection & death data
    d3.json(`https://covid19bootcampproject3.herokuapp.com/county_clean/${infectionDateValue}`, infectionData => {
        //Parse through data
        infectionData.forEach(d => {
            d.cases = +d.cases;
            d.deaths = +d.deaths;
        });

        //Create data arrays for heatmap layers
        let infectionArr = [];
        let deathArr = [];
        //Add lat lngs to the arrays
        infectionData.forEach(d => {
            infectionArr.push([d.lat, d.long, d.cases]);
             deathArr.push([d.lat, d.long, d.deaths]);
            }
        );

        //Create Heatmap layers
        let infectionLayer = L.heatLayer(infectionArr).addTo(Map);
        let deathLayer = L.heatLayer(deathArr).addTo(Map);

        //Set Overlay Layers
        let overlayMaps = {
            Infections: infectionLayer,
            Deaths: deathLayer
        };

        function renderInfection() {
            //Grab date value
            infectionDateValue = infectionDate.property("value");
            //Reset arrays
            infectionArr = [];
            deathArr = [];
            //Repush data
            infectionData.forEach(d => {
                infectionArr.push([d.lat, d.long, d.cases]);
                 deathArr.push([d.lat, d.long, d.deaths]);
                }
            );
            //Reset layers
            infectionLayer.setLatLngs(infectionArr);
            deathLayer.setLatLngs(deathArr);
        }

        //Create Layer control
        L.control.layers(overlayMaps).addTo(Map);

        //Add legend to map
        legend.addTo(Map);

        //Event handler to update heatmap
        infectionDate.on("change.heat", renderInfection);
    });
}

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

//Event handler to begin running code
infectionDateType.on("change.heat", runInfection);