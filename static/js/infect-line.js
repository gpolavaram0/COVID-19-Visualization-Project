//Date selectors
const iLineStart = d3.select("#start-date");
const iLineEnd = d3.select("#end-date");

//Function for creating iline
function runiLine() {
    //Read in data
    d3.json("https://covid19bootcampproject3.herokuapp.com/infection_date", infectionData => {
        //Parse through the data
        infectionData.forEach(d => {
            d.date = parseTime(d.date);
            d.cases = +d.cases;
            d.deaths = +d.deaths;
        });

        //Set initial traces
        let traceInfection = {
            type: "scatter",
            x: infectionData.map(d => d.date),
            y: infectionData.map(d => d.cases),
            mode: "lines",
            name: "Infections",
            line: {
                color: "rgb(219, 130, 22)",
                width: 3
            }
        };
        let traceDeath = {
            type: "scatter",
            x: infectionData.map(d => d.date),
            y: infectionData.map(d => d.deaths),
            mode: "lines",
            name: "Deaths",
            line: {
                color: "rgb(64, 64, 66)",
                width: 3
            }
        };
        //Set the layout for the chart
        const layout = {
            title: "Confirmed Cases and Deaths of COVID-19",
        }
        //Set data array
        const data = [traceInfection, traceDeath];
        //Draw Plot
        Plotly.newPlot("infection-line", data, layout);

        //function to update chart
        function renderiLine() {
            //Grab start and end date
            const startDate = iLineStart.property("value");
            const endDate = iLineEnd.property("value");
            //Filter data
            const dataFiltered = infectionData.filter(d => d.date >= startDate && d.date <= endDate);
            //Reset x values
            const ix = dataFiltered.map(d => d.date);
            const dx = dataFiltered.map(d => d.date);
            //Reset y values
            const iy = dataFiltered.map(d => d.cases);
            const dy = dataFiltered.map(d => d.deaths);
            //Redraw with new values
            Plotly.restyle("infection-line", "x", [ix, dx]);
            Plotly.restyle("infection-line", "y", [iy, dy]);
        }

        //Render initial chart
        renderiLine();

    });
}

//Draw initial chart
runiLine();

//Event handler to adjust line chart on input
iLineStart.on("change", runiLine);
iLineEnd.on("change", runiLine);