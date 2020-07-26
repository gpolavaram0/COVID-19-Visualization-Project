const dateHolder = d3.select("#date-holder");
const startDateHolder = d3.select("#start-date-holder");
const endDateHolder = d3.select("#end-date-holder");
const dateTypeSelect = d3.select("#date-type");
const infectMap = d3.select("#covid-heat");
const infectLine = d3.select("#covid-line");
const airMap = d3.select("#air-heat");
const airLine = d3.select("#air-line");

function changeDate() {
    const dateType = d3.select("#date-type").property("value");
    if (dateType === "Date Range") {
        dateHolder.style("display", "none");
        startDateHolder.style("display", "");
        endDateHolder.style("display", "");
        infectMap.style("display", "none");
        infectLine.style("display", "");
        airMap.style("display", "none");
        airLine.style("display", "");
    }
    else if (dateType === "Single Date") {
        dateHolder.style("display", "");
        startDateHolder.style("display", "none");
        endDateHolder.style("display", "none");
        infectMap.style("display", "");
        infectLine.style("display", "none");
        airMap.style("display", "");
        airLine.style("display", "none");
    }
}

dateTypeSelect.on("change", changeDate);
changeDate();