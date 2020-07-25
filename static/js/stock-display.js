const stockSelector = d3.select("#stock-selector");
const RetailChart = d3.select("#Retail");
const TechChart = d3.select("#Tech");
const EnterChart = d3.select("#Entertainment");
const CommChart = d3.select("#Ecomm");
const AirlineChart = d3.select("#Airline");

function changeStock() {
    const stockType = stockSelector.property("value");
    if (stockType === "Retail") {
        RetailChart.style("display", "");
        TechChart.style("display", "none");
        EnterChart.style("display", "none");
        CommChart.style("display", "none");
        AirlineChart.style("display", "none");
    }
    else if (stockType === "Technology") {
        RetailChart.style("display", "none");
        TechChart.style("display", "");
        EnterChart.style("display", "none");
        CommChart.style("display", "none");
        AirlineChart.style("display", "none");
    }
    else if (stockType === "Entertainment") {
        RetailChart.style("display", "none");
        TechChart.style("display", "none");
        EnterChart.style("display", "");
        CommChart.style("display", "none");
        AirlineChart.style("display", "none");
    }
    else if (stockType === "E-commerce") {
        RetailChart.style("display", "none");
        TechChart.style("display", "none");
        EnterChart.style("display", "none");
        CommChart.style("display", "");
        AirlineChart.style("display", "none");
    }
    else if (stockType === "Airlines") {
        RetailChart.style("display", "none");
        TechChart.style("display", "none");
        EnterChart.style("display", "none");
        CommChart.style("display", "none");
        AirlineChart.style("display", "");
    }
}

stockSelector.on("change", changeStock);
changeStock();