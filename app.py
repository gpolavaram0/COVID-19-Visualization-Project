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
# # Connects to the database using the app config
db = SQLAlchemy(app)

test_data = db.Table('test_data_csv', db.metadata, autoload = True, autoload_with = db.engine)
# db.Model.metadata.reflect(bind=db.engine,schema='dbh8e6jsnrlr1k')
# db.reflect(bind='__all__', app=None)

# Base = automap_base()
# Base.prepare(engine, reflect=True)
# test_data_csv = Base.classes.test_data_csv


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
    # """List all available api routes."""
    # return (
    #     f"Available Routes:<br/>"
    #     f"/api/v1.0/names<br/>"
    #     f"/api/v1.0/passengers"
    # )

    # results = session.query(county.county).all()
    x = db.session.query(test_data).all()
    test_dict = {"key":"value"}

    return jsonify(x)

@app.route("/stocks")
def stocks():

    stock_data = get_data.main()

    return render_template('index2.html', stock_data = stock_data)


if __name__ == '__main__':
    app.run(debug=True)
