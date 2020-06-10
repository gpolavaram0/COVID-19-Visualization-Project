d3.json("https://covid19bootcampproject3.herokuapp.com/stocks", stock_data => {
    console.log(stock_data);
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


    var comp1_data = stock_data.filter(d => d.Ticker === comp1);
    console.log(comp1_data);   
    var comp2_data = stock_data.filter(d => d.Ticker === comp2);
    var comp3_data = stock_data.filter(d => d.Ticker === comp3);
    var comp4_data = stock_data.filter(d => d.Ticker === comp4);
    var comp5_data = stock_data.filter(d => d.Ticker === comp5);
    var comp6_data = stock_data.filter(d => d.Ticker === comp6);
    var comp7_data = stock_data.filter(d => d.Ticker === comp7);
    var comp8_data = stock_data.filter(d => d.Ticker === comp8);
    var comp9_data = stock_data.filter(d => d.Ticker === comp9);
    var comp10_data = stock_data.filter(d => d.Ticker === comp10);


    var dates = stock_data.map(d => d.dates)
    console.log(dates);

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
});
