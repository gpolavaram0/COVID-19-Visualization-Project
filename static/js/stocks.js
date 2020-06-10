//Chart selector
const stockInput = d3.select("#stock-selector");

//Call in data
d3.json("https://covid19bootcampproject3.herokuapp.com/stocks", stock_data => {
    var comps = ['WMT', 'TGT', 'NVDA', 'ZM', 'SPOT', 'NFLX', 'AMZN', 'SHOP', 'DAL', 'UAL'];
    var comp1 = comps[0]
    var comp2 = comps[1]
    var comp3 = comps[2]
    var comp4 = comps[3]
    var comp5 = comps[4]
    var comp6 = comps[5]
    var comp7 = comps[6]
    var comp8 = comps[7]
    var comp9 = comps[8]
    var comp10 = comps[9]


    var comp1_data = stock_data.map(d => d["WMT"]);
    comp1_data.unshift("WMT"); 
    var comp2_data = stock_data.map(d => d["TGT"]);
    comp2_data.unshift("TGT");
    var comp3_data = stock_data.map(d => d["NVDA"]);
    comp3_data.unshift("NVDA");
    var comp4_data = stock_data.map(d => d["ZM"]);
    comp4_data.unshift("ZM");
    var comp5_data = stock_data.map(d => d["SPOT"]);
    comp5_data.unshift("SPOT");
    var comp6_data = stock_data.map(d => d["NFLX"]);
    comp6_data.unshift("NFLX");
    var comp7_data = stock_data.map(d => d["AMZN"]);
    comp7_data.unshift("AMZN");
    var comp8_data = stock_data.map(d => d["SHOP"]);
    comp8_data.unshift("SHOP");
    var comp9_data = stock_data.map(d => d["DAL"]);
    comp9_data.unshift("DAL");
    var comp10_data = stock_data.map(d => d["UAL"]);
    comp10_data.unshift("UAL");


    var dates = stock_data.map(d => d["date_local"]);
    dates.unshift('date');

    //Function to create/switch charts
    function renderStock() {
        //Chart value 
        const stockInputValue = stockInput.property("value")
        //Create chart on value
        switch(stockInputValue) {
            case 'Retail':
                {
                    /* Retail Chart */
                    var chart = bb.generate({
                        title: {
                            text: "Retail Market - Walmart (WMT) vs Target (TGT)"
                        },

                    bindto: "#Retailchart",
                    data: {
                        x: "date",
                        columns: [
                            dates,
                            comp1_data, comp2_data
                        ],
                        types: {
                            "WMT": "area-line-range",
                            "TGT": "area-line-range",
                        },
                        colors: {
                            "WMT": "red",
                            "TGT": "green",
                        },

                        axes: {
                            "WMT": "y",
                            "TGT": "y",
                        }
                        
                    },

                    axis: {
                        x: {
                        type: "timeseries",
                        tick: {
                            format: "%Y-%m-%d"
                        }
                        },

                    },


                    });
                    break;
                }
            case 'Tech':
                {
                    /* Technology Chart */
                    var chart = bb.generate({
                        title: {
                            text: "Technology Market - Nvidia (NVDA) vs Zoom (ZM)"
                        },

                    bindto: "Techchart",
                    data: {
                        x: "date",
                        columns: [
                            dates,
                            comp3_data, comp4_data 
                        ],
                        types: { 
                            "NVDA": "area-line-range",
                            "ZM": "area-line-range",
                            
                        },
                        colors: {
                            "NVDA": "red",
                            "ZM": "green",

                        },

                        axes: {
                            "NVDA": "y",
                            "ZM": "y",
                        }
                    },

                    axis: {
                        x: {
                        type: "timeseries",
                        tick: {
                            format: "%Y-%m-%d"
                        }
                        },
                    },
                    });
                    break;
                }
            case 'Entertainment':
                {
                    /* Entertainment Chart */
                    var chart = bb.generate({
                        title: {
                            text: "Entertainment Market - Spotify (SPOT) vs Netflix (NFLX)"
                        },

                    bindto: "Enterchart",
                    data: {
                        x: "date",
                        columns: [
                            dates,
                            comp5_data, comp6_data 
                        ],
                        types: {
                            "SPOT": "area-line-range",
                            "NFLX": "area-line-range",
                            
                        },
                        colors: {
                            "SPOT": "red",
                            "NFLX": "green",

                        },

                        axes: {
                            "SPOT": "y",
                            "NFLX": "y",
                        }
                    },

                    axis: {
                        x: {
                        type: "timeseries",
                        tick: {
                            format: "%Y-%m-%d"
                        }
                        },

                    },
                    });
                    break;
                }
            case 'eCommerce':
                {
                    /* eCommerce Chart */
                    var chart = bb.generate({
                        title: {
                            text: "eCommerce Market - Amazon (AMZN) vs Shopify (SHOP)"
                        },

                    bindto: "Comchart",
                    data: {
                        x: "date",
                        columns: [
                            dates,
                            comp7_data, comp8_data 
                        ],
                        types: { 
                            "AMZN": "area-line-range",
                            "SHOP": "area-line-range",
                            
                        },
                        colors: {
                            "AMZN": "red",
                            "SHOP": "green",

                        },

                        axes: {
                            "AMZN": "y",
                            "SHOP": "y",
                        }
                    },

                    axis: {
                        x: {
                        type: "timeseries",
                        tick: {
                            format: "%Y-%m-%d"
                        }
                        },
                    },
                    });
                    break;
                }
            case 'Airlines':
                {
                    /* Airline Chart */
                    var chart = bb.generate({
                        title: {
                            text: "Airline Market - Delta (DAL) vs United (UAL)"
                        },
                    bindto: "Airlinechart",
                    data: {
                        x: "date",
                        columns: [
                            dates,
                            comp9_data, comp10_data 
                        ],
                        types: { 
                            "DAL": "area-line-range",
                            "UAL": "area-line-range",
                            
                        },
                        colors: {
                            "DAL": "red",
                            "UAL": "green",

                        },

                        axes: {
                            "DAL": "y",
                            "UAL": "y",
                        }
                    },

                    axis: {
                        x: {
                        type: "timeseries",
                        tick: {
                            format: "%Y-%m-%d"
                        }
                        },
                    },
                    });
                    break;
                }
        }
    
    //Event handler for changing chart
    stockInput.on("change.stock", renderStock);
    }
});