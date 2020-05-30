import numpy as np
import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################

# DATABASE_URL will contain the database connection string:
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
# Connects to the database using the app config
db = SQLAlchemy(app)

# session.query(Invoices.BillingCountry).group_by(Invoices.BillingCountry).all()

db.session.query(test_data_csv).all()


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/stocks<br/>"
#         f"/api/v1.0/hospitals"
#     )

    return render_template("index.html")



if __name__ == '__main__':
    app.run(debug=True)
