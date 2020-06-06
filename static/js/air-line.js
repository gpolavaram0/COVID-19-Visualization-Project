//Date selectors
const aLineStart = d3.select("#start-date");
const aLineEnd = d3.select("#end-date");

//Read in data
d3.json("https://covid19bootcampproject3.herokuapp.com/air_line", airData => {
    //Parse through the data
    airData.forEach(d => d.observation_count = +d.observation_count);
    //Filter data by parameter
    const lCO = airData.filter(d => d.parameter === "Carbon monoxide");
    const lNO2 = airData.filter(d => d.parameter === "Nitrogen dioxide (NO2)");
    const lO3 = airData.filter(d => d.parameter === "Ozone");
    const lSO2 = airData.filter(d => d.parameter === "Sulfur dioxide");

    //Set initial traces
    let traceCO = {
        type: "scatter",
        x: lCO.map(d => d.date_local),
        y: lCO.map(d => d.observation_count),
        mode: "lines",
        name: "Carbon Monoxide (ppm)",
        line: {
            color: "rgb(82, 77, 77)",
            width: 3
        }
    };
    let traceNO2 = {
        type: "scatter",
        x: lNO2.map(d => d.date_local),
        y: lNO2.map(d => d.observation_count),
        mode: "lines",
        name: "Nitrogen Dioxide (ppb)",
        line: {
            color: "rgb(181, 133, 91)",
            width: 3
        }
    };
    let traceO3 = {
        type: "scatter",
        x: lO3.map(d => d.date_local),
        y: lO3.map(d => d.observation_count),
        mode: "lines",
        name: "Ozone (ppm)",
        line: {
            color: "rgb(185, 223, 250)",
            width: 3
        }
    };
    let traceSO2 = {
        type: "scatter",
        x: lSO2.map(d => d.date_local),
        y: lSO2.map(d => d.observation_count),
        mode: "lines",
        name: "Sulfur Dioxide (ppb)",
        line: {
            color: "rgb(218, 230, 90)",
            width: 3
        }
    };
    //Set the layout for the chart
    const layout = {
        title: "Air Quality Pollutants Over Time",
    }
    //Set data array
    const data = [traceCO, traceNO2, traceO3, traceSO2];
    //Draw Plot
    Plotly.newPlot("weather-line", data, layout);

    //function to update chart
    function renderaLine() {
        //Grab start and end date
        const startDate = aLineStart.property("value");
        const endDate = aLineEnd.property("value");
        //Filter data
        const filterCO = lCO.filter(d => d.date_local >= startDate && d.date_local <= endDate);
        const filterNO2 = lNO2.filter(d => d.date_local >= startDate && d.date_local <= endDate);
        const filterO3 = lO3.filter(d => d.date_local >= startDate && d.date_local <= endDate);
        const filterSO2 = lSO2.filter(d => d.date_local >= startDate && d.date_local <= endDate);
        //Reset x values
        const COx = filterCO.map(d => d.date_local);
        const NO2x = filterNO2.map(d => d.date_local);
        const O3x = filterO3.map(d => d.date_local);
        const SO2x = filterSO2.map(d => d.date_local);
        //Reset y values
        const COy = filterCO.map(d => d.observation_count);
        const NO2y = filterNO2.map(d => d.observation_count);
        const O3y = filterO3.map(d => d.observation_count);
        const SO2y = filterSO2.map(d => d.observation_count);
        //Redraw with new values
        Plotly.restyle("weather-line", "x", [COx, NO2x, O3x, SO2x]);
        Plotly.restyle("weather-line", "y", [COy, NO2y, O3y, SO2y]);
    }

    //Render initial chart
    renderaLine();
    //Event handler to adjust line chart on input
    aLineStart.on("change.infect", renderaLine);
    aLineEnd.on("change.infect", renderaLine);
});