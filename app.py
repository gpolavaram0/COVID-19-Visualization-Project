import numpy as np
import os
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_sqlalchemy import SQLAlchemy

from flask import Flask, jsonify, render_template, request, redirect
import get_data

import psycopg2

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

app._static_folder = 'static/'

# load the tickers we want into a dataframe
tickers = pd.DataFrame({
    'Sector' : ['Retail', 'Retail', 'Tech', 'Tech', 'Entertainment', 'Entertainment', 'Ecommerce', 'Ecommerce', 'Airline', 'Airline'],
    'Name' : ['Walmart', 'Target', 'Nvidia', 'Zoom', 'Spotify', 'Netflix', 'Amazon', 'Shopify', 'Delta', 'United Airlines'],
    'Ticker' : ['WMT', 'TGT', 'NVDA', 'ZM', 'SPOT', 'NFLX', 'AMZN', 'SHOP', 'DAL', 'UAL'],
})

##################################

# DATABASE_URL will contain the database connection string


# SQLALCHEMY_DATABASE_URI_AWS links to AWS database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["SQLALCHEMY_DATABASE_URI_AWS"]


# # Connects to the database using the app config
db = SQLAlchemy(app)

#function to reflect db, store in dataframe, and convert to a format that the javascript files can read
def database_csv_retriever(csv_name, *args):
    csv_name_db = db.Table(csv_name, db.metadata, autoload = True, autoload_with = db.engine)
    csv_query = db.session.query(csv_name_db).all()
    
    csv_date_df = pd.DataFrame(csv_query, columns = args)
    csv_date_df = csv_date_df.reset_index(drop=True)
    csv_date_df['date_local'] = csv_date_df['date_local'].astype(str)
    # print(csv_date_df)
    csv_lod = csv_date_df.to_dict('records')
    # print(csv_lod)

    return csv_lod

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():

    return render_template("index.html")

@app.route("/test")
def test():
   
    x = db.session.query(test_data).all()
    test_dict = {"key":"value"}
    print(x)
    return jsonify(x)

@app.route("/air_quality/<air_quality_single_date>")
def air_quality(air_quality_single_date):
    # air_quality_lod = database_csv_retriever("air_quality","index","latitude","longitude","parameter","pollutant_standard","date_local","units_of_measure","observation_count","observation_percent","state","county","city")
    
    air_quality_name_db = db.Table('air_quality', db.metadata, autoload = True, autoload_with = db.engine)
    air_quality_query = db.session.query(air_quality_name_db).filter(air_quality_name_db.c.date_local == air_quality_single_date).all()
    air_quality_date_df = pd.DataFrame(air_quality_query, columns = ["index","latitude","longitude","parameter","pollutant_standard","date_local","units_of_measure","observation_count","observation_percent","state","county","city"])
    air_quality_date_df = air_quality_date_df.reset_index(drop=True)
    air_quality_date_df['date_local'] = air_quality_date_df['date_local'].astype(str)
    air_quality_lod = air_quality_date_df.to_dict('records')
    
    return jsonify(air_quality_lod)


@app.route("/county_clean/<county_clean_single_date>")
def county_clean(county_clean_single_date):
    # county_clean_lod = database_csv_retriever("county_clean","index","county","state","lat","long","date_local","cases","deaths")

    county_clean_name_db = db.Table('county_clean', db.metadata, autoload = True, autoload_with = db.engine)
    county_clean_query = db.session.query(county_clean_name_db).filter(county_clean_name_db.c.date_local == county_clean_single_date).all()
    county_clean_date_df = pd.DataFrame(county_clean_query, columns = ["index","county","state","lat","long","date_local","cases","deaths"])
    county_clean_date_df = county_clean_date_df.reset_index(drop=True)
    county_clean_date_df['date_local'] = county_clean_date_df['date_local'].astype(str)
    county_clean_lod = county_clean_date_df.to_dict('records')

    return jsonify(county_clean_lod)

@app.route("/infection_date")
def infection_date():
    infection_date_lod = database_csv_retriever("infection_date",'date_local','cases','deaths')
    
    return jsonify(infection_date_lod)
    # return jsonify(infection_date_date_lod)

@app.route("/air_line")
def air_line():

    air_line_lod = database_csv_retriever("air_line","date_local","parameter","observation_count")
    return jsonify(air_line_lod)

@app.route("/stocks")
def stocks():

    stock_data = get_data.main()
    stock_data_df = pd.DataFrame(stock_data)
    stock_data_df.drop(index = 0, inplace = True)
    stock_data_df['date'] = stock_data_df['date'].astype(str)
    stock_data_df=stock_data_df.rename(columns = {'date':'date_local'})
    stock_data_lod = stock_data_df.to_dict('records')
    
    # return render_template('index2.html', stock_data = stock_data)
    return jsonify(stock_data_lod)


@app.route("/stock-page.html")
def stock_page():

    stock_data = get_data.main()
        
    return render_template('stock-page.html')
    
if __name__ == '__main__':
    app.run(debug=True)
