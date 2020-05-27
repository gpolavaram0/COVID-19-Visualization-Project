import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################

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
