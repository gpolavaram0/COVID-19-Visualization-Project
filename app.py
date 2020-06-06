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
# Database Setup
#################################################
# # engine = create_engine("")
# Base = automap_base()
# Base.prepare(engine, reflect=True)
# Base.classes.keys()
# Station = Base.classes.station
# Measurement = Base.classes.measurement
# county = Base.classes.county_clean

# State = Base.classes.state

# session = Session(engine)
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

###############################
app._static_folder = 'static/'

# load the tickers we want into a dataframe
tickers = pd.DataFrame({
    'Sector' : ['Retail', 'Retail', 'Tech', 'Tech', 'Entertainment', 'Entertainment', 'Ecommerce', 'Ecommerce', 'Airline', 'Airline'],
    'Name' : ['Walmart', 'Target', 'Nvidia', 'Zoom', 'Spotify', 'Netflix', 'Amazon', 'Shopify', 'Delta', 'United Airlines'],
    'Ticker' : ['WMT', 'TGT', 'NVDA', 'ZM', 'SPOT', 'NFLX', 'AMZN', 'SHOP', 'DAL', 'UAL'],
})

##################################

# DATABASE_URL will contain the database connection string:

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://hdjdaacogqimcu:a6007ea2abde788e2b86e856357cb8741377410b135800ea087bd2780f50e2fb@ec2-52-44-55-63.compute-1.amazonaws.com:5432/dbh8e6jsnrlr1k'

# engine = create_engine('postgresql://scott:tiger@localhost/mydatabase')

# # Connects to the database using the app config
db = SQLAlchemy(app)

# test_data = db.Table('test_data_csv', db.metadata, autoload = True, autoload_with = db.engine)
# db.Model.metadata.reflect(bind=db.engine,schema='dbh8e6jsnrlr1k')
# db.reflect(bind='__all__', app=None)

# Base = automap_base()
# Base.prepare(engine, reflect=True)
# test_data_csv = Base.classes.test_data_csv

# infection_date = db.Table('infection_date', db.metadata, autoload = True, autoload_with = db.engine)

# infection_date = db.Table('infection_date', db.metadata, autoload = True, autoload_with = db.engine)
# infection_date_query = db.session.query(infection_date).all()

###############infection_date#########################

#extracts infection_date_csv from postgres and converts to list of dictionaries in route /infection_date
# infection_date = db.Table('infection_date', db.metadata, autoload = True, autoload_with = db.engine)
# infection_date_query = db.session.query(infection_date).all()
# infection_date_df = pd.DataFrame(infection_date_query, columns = ['date','cases','deaths'])
# infection_date_df = infection_date_df.reset_index(drop=True)
# infection_date_lod = infection_date_df.to_dict('records')
######################################################

def database_csv_retriever(csv_name, *args):
    csv_name_db = db.Table(csv_name, db.metadata, autoload = True, autoload_with = db.engine)
    csv_query = db.session.query(csv_name_db).all()
    # print(csv_query)
    csv_date_df = pd.DataFrame(csv_query, columns = args)
    csv_date_df = csv_date_df.reset_index(drop=True)
    csv_date_df['date_local'] = csv_date_df['date_local'].astype(str)
    # print(csv_date_df)
    csv_lod = csv_date_df.to_dict('records')
    # print(csv_lod)

    return csv_lod


# database_csv_retriever("infection_date",'date','cases','deaths')

# csv_name_db = db.Table("air_line", db.metadata, autoload = True, autoload_with = db.engine)
# csv_query = db.session.query(csv_name_db).column_descriptions()

# for title in csv_query:
#     print(title)

# x = db.session.query(infection_date).all()
# print(x)
# session.query(Invoices.BillingCountry).group_by(Invoices.BillingCountry).all()


# data = engine.execute("SELECT * FROM test_data_csv;")
# print(x)

# results = session.query(Station.name)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    # """List all available api routes."""
    # return (
    #     f"Available Routes:<br/>"
    #     f"/api/v1.0/names<br/>"
    #     f"/api/v1.0/passengers"
    # )

    return render_template("index.html")


@app.route("/test")
def test():
   

    # results = session.query(county.county).all()
    x = db.session.query(test_data).all()
    test_dict = {"key":"value"}
    print(x)
    return jsonify(x)

@app.route("/air_quality_truncated")
def air_quality():
    air_quality_lod = database_csv_retriever("air_quality_truncated","index","latitude","longitude","parameter","pollutant_standard","date_local","units_of_measure","observation_count","observation_percent","state","county","city")
    return jsonify(air_quality_lod)


@app.route("/county_clean_truncated")
def county_clean():
    county_clean_lod = database_csv_retriever("county_clean_truncated","index","county","state","lat","long","date_local","cases","deaths")
    return jsonify(county_clean_lod)

@app.route("/infection_date")
def infection_date():
    infection_date_lod = database_csv_retriever("infection_date",'date_local','cases','deaths')
    return jsonify(infection_date_lod)

@app.route("/air_line")
def air_line():


    air_line_lod = database_csv_retriever("air_line","date_local","parameter","observation_count")
    return jsonify(air_line_lod)

@app.route("/stocks")
def stocks():

    stock_data = get_data.main()

    return render_template('index2.html', stock_data = stock_data)


if __name__ == '__main__':
    app.run(debug=True)
