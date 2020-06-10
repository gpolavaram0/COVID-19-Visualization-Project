//Selector for Date Choices
const dateType = d3.select("#date-type");
//Selectors for Date Inputs
const dateSingle = d3.select("#date-input");
const dateStart = d3.select("#start-date-holder");
const dateEnd = d3.select("#end-date-holder");
//Selector for stock industry
const stockSelector = d3.select("#stock-selector");

//Selector for comparison chart
const chartSelect = d3.select("#comparison");
//Selectors for comparison classes
const stockClassSelector = d3.selectAll(".stock");
const weatherClassSelector = d3.selectAll(".weather");
const popDenClassSelector = d3.selectAll(".popDen");
const stockClass = stockClassSelector["_groups"][0];
const weatherClass = weatherClassSelector["_groups"][0];
const popDenClass = popDenClassSelector["_groups"][0];

//Function to adjust website based on chart selection
function renderChart() {
    const currentChart = d3.select("#comparison").property("value");
    const dateTypeValue = dateType.property("value");
    //Conditional statements to set displays
    switch (currentChart) {
        case 'Weather Comparison':
          {
                for (i = 0; i < stockClass.length; i++) {
                    stockClass[i].style.display = "none";
                }
                for (i = 0; i < popDenClass.length; i++) {
                    popDenClass[i].style.display = "none";
                }
                for (i = 0; i < weatherClass.length; i++) {
                    weatherClass[i].style.display = "inline-block";
                }
                dateSingle.property("value", "2020-03-31");
                dateSingle.attr("value", "2020-03-31");
                dateSingle.attr("min", "2020-01-22");
                dateSingle.attr("max", "2020-05-25");
                dateStart.select("input").property("value", "2020-01-22");
                dateStart.select("input").attr("value", "2020-01-22");
                dateStart.select("input").attr("min", "2020-01-22");
                dateStart.select("input").attr("max", "2020-05-25");
                dateStart.select("input").property("disabled", false);
                dateEnd.select("input").property("value", "2020-03-31");
                dateEnd.select("input").attr("value", "2020-03-31");
                dateEnd.select("input").attr("min", "2020-01-22");
                dateEnd.select("input").attr("max", "2020-05-25");
                dateEnd.select("input").property("disabled", false);
                dateType.property("disabled", false);;
                switch (dateTypeValue) {
                    case 'Date Range':
                        {
                            dateSingle.style("display", "none")
                            dateStart.style("display", "");
                            dateEnd.style("display", "")
                            d3.select("#infection-heatmap").style("display", "none");
                            d3.select("#weather-heatmap").style("display", "none");
                            d3.select("#infection-line").style("display", "inline-block");
                            d3.select("#weather-line").style("display", "inline-block");
                            runiLine();
                            break;
                        }
                    case 'Single Date':
                        {
                            dateStart.style("display", "none");
                            dateEnd.style("display", "none");
                            dateSingle.style("display", "inline-block");
                            d3.select("#infection-line").style("display", "none");
                            d3.select("#weather-line").style("display", "none");
                            d3.select("#infection-heatmap").style("display", "inline-block");
                            d3.select("#weather-heatmap").style("display", "inline-block");
                            runInfection();
                            runAir();
                            break;
                        }
                }
                break;
          }
        case 'Stock Lookup':
            {
                for (i = 0; i < stockClass.length; i++) {
                    stockClass[i].style.display = "inline-block";
                }
                for (i = 0; i < weatherClass.length; i++) {
                    weatherClass[i].style.display = "none";
                }
                for (i = 0; i < popDenClass.length; i++) {
                    popDenClass[i].style.display = "none";
                }
                d3.select("#infection-line").style("display", "inline-block");
                d3.select("#infection-heatmap").style("display", "none");                
                dateSingle.style("display", "none");
                dateStart.style("display", "");
                dateEnd.style("display", "");
                dateType.property("value", "Date Range");
                dateType.property("disabled", true);
                dateStart.select("input").property("value", "2020-01-22");
                dateEnd.select("input").property("value", "2020-05-25");
                dateStart.select("input").property("disabled", true);
                dateEnd.select("input").property("disabled", true);
                runStock(); 
                const stockType = stockSelector.property("value");
                function stockSwitch() {
                    if (d3.select("#Retailchart").innerHTML  !== "" && d3.select("#Techchart").innerHTML !== "" && d3.select("#Enterchart").innerHTML !== "" && d3.select("#Comchart").innerHTML !== "" && d3.select("#Airlinechart").innerHTML !== "") {
                        switch (stockType) {
                            case 'Retail':
                                {
                                    d3.select("#Techchart").style("display", "none");
                                    d3.select("#Enterchart").style("display", "none");
                                    d3.select("#Comchart").style("display", "none");
                                    d3.select("#Airlinechart").style("display", "none");
                                    d3.select("#Retailchart").style("display", "inline-block");
                                    break;
                                }
                            case 'Tech':
                                {
                                    d3.select("#Techchart").style("display", "inline-block");
                                    d3.select("#Enterchart").style("display", "none");
                                    d3.select("#Comchart").style("display", "none");
                                    d3.select("#Airlinechart").style("display", "none");
                                    d3.select("#Retailchart").style("display", "none");
                                    break;
                                }
                            case 'Entertainment':
                                {
                                    d3.select("#Techchart").style("display", "none");
                                    d3.select("#Enterchart").style("display", "inline-block");
                                    d3.select("#Comchart").style("display", "none");
                                    d3.select("#Airlinechart").style("display", "none");
                                    d3.select("#Retailchart").style("display", "none");
                                    break;
                                }
                            case 'Communications':
                                {
                                    d3.select("#Techchart").style("display", "none");
                                    d3.select("#Enterchart").style("display", "none");
                                    d3.select("#Comchart").style("display", "inline-block");
                                    d3.select("#Airlinechart").style("display", "none");
                                    d3.select("#Retailchart").style("display", "none");
                                    break;
                                }
                            case 'Airlines':
                                {
                                    d3.select("#Techchart").style("display", "none");
                                    d3.select("#Enterchart").style("display", "none");
                                    d3.select("#Comchart").style("display", "none");
                                    d3.select("#Airlinechart").style("display", "inline-block");
                                    d3.select("#Retailchart").style("display", "none");
                                    break;
                                }
                                }
                        }
                    else {
                        setTimeout(stockSwitch, 300);
                    }
                }
                stockSwitch();  
                runiLine();
                break;
            }
        case 'Population Density Comparison':
            {
                for (i = 0; i < stockClass.length; i++) {
                    stockClass[i].style.display = "none";
                }
                for (i = 0; i < weatherClass.length; i++) {
                    weatherClass[i].style.display = "none";
                }
                for (i = 0; i < popDenClass.length; i++) {
                    popDenClass[i].style.display = "inline-block";
                }
                dateType.property("disabled", false);
                dateStart.select("input").property("disabled", false);
                dateEnd.select("input").property("disabled", false);
                dateSingle.select("input").property("disabled", false);
                dateStart.select("input").attr("min", "2020-01-22");
                dateStart.select("input").attr("max", "2020-05-25");
                dateEnd.select("input").attr("min", "2020-01-22");
                dateEnd.select("input").attr("max", "2020-05-25");
                dateSingle.attr("max", "2020-05-25");
                dateSingle.attr("min", "2020-01-22");
                switch(dateTypeValue) {
                    case 'Single Date':
                        {
                            d3.select("#infection-line").style("display", "none");
                            d3.select("#infection-heatmap").style("display", "inline-block");
                            dateStart.style("display", "none");
                            dateEnd.style("display", "none");
                            dateSingle.style("display", "");
                            dateSingle.property("value", "2020-05-25");
                            dateSingle.attr("value", "2020-05-25");
                            runInfection();
                            break;
                        }
                    case 'Date Range':
                        {
                            d3.select("#infection-line").style("display", "inline-block");
                            d3.select("#infection-heatmap").style("display", "none");
                            dateStart.style("display", "");
                            dateEnd.style("display", "");
                            dateSingle.style("display", "none");
                            dateStart.select("input").property("value", "2020-01-22");
                            dateStart.select("input").attr("value", "2020-01-22");
                            dateEnd.select("input").property("value", "2020-05-25");
                            dateEnd.select("input").attr("value", "2020-05-25");
                            runiLine();
                            break;
                        }
                }
                break;
            }
    }
}

//Set initial display
renderChart();
//Event handler to change charts when selected
chartSelect.on("change", renderChart);
dateType.on("change", renderChart);
stockSelector.on("change", renderChart);