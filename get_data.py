import sys
from flask import Flask, render_template, jsonify, redirect
# import pymongo
# import scrape_stock
from yahoo_fin.stock_info import get_data
# from sqlalchemy import create_engine
import datetime
import pandas as pd
import requests
from bs4 import BeautifulSoup

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

tickers = pd.DataFrame({
    'Sector' : ['Retail', 'Retail', 'Tech', 'Tech', 'Entertainment', 'Entertainment', 'Ecommerce', 'Ecommerce', 'Airline', 'Airline'],
    'Name' : ['Walmart', 'Target', 'Nvidia', 'Zoom', 'Spotify', 'Netflix', 'Amazon', 'Shopify', 'Delta', 'United Airlines'],
    'Ticker' : ['WMT', 'TGT', 'NVDA', 'ZM', 'SPOT', 'NFLX', 'AMZN', 'SHOP', 'DAL', 'UAL'],
})

def scrape_stock_data(tick_name, start_date, end_date):
    df = get_data(ticker=tick_name, start_date=start_date, end_date=end_date)
    df.reset_index(inplace=True)
    df.rename(columns={'index' : 'date'}, inplace=True)
    df['date'] = pd.to_datetime(df['date'])
    #df['date'] = df['date'].dt.date
    return(df)

def build_stock_df(tickers, start_date, end_date):

    # get the ticker results for the time period
    for record in tickers.index:
        results = scrape_stock_data(tickers['Ticker'][record], start_date, end_date)
        results['company'] = tickers['Name'][record]
        results['sector'] = tickers['Sector'][record]
        

        price_cols = ['high', 'close', 'low', 'open', 'adjclose']

        #organize data for d3 use
        results['high'] = results.high.round(2)
        results['close'] = results.close.round(2)
        results['low'] = results.low.round(2)
        results['open'] = results.open.round(2)
        results['adjclose'] = results.adjclose.round(2)

        # if a combined dataset exists append these new results
        try:
            combined_results = combined_results.append(results, ignore_index=True)
            
        # if combined dataset doesn't exist make this dataframe  the combined results df
        except:
            combined_results = results

    return combined_results

def load_stock_data(tickers):
    """
    This functions chekcs the dates and gets new data if needed
    """
    
    # covid data starts on 1/22/20 and ends 05-24-2020
    start_date = '01-22-2020'
    end_date = '05-24-2020'
    
    
    # connect to the database
    connection_string = os.environ['CONNECTION_STRING']
    engine = create_engine(f'postgresql://{connection_string}')
    
    # if the table exists set the start date to one day past the last date in the db
    if engine.has_table('stocks'):
        result = engine.execute('SELECT MAX (date) FROM stocks;')
        for row in result:
            start_date = (row[0] + datetime.timedelta(days = 1))
        
        # stock data is only available for weekdays
        while start_date.weekday() > 4:
            start_date = start_date + datetime.timedelta(days = 1)
        
        start_date = start_date.strftime('%m-%d-%Y')

    if start_date < end_date:
        stock_df = build_stock_df(tickers=tickers, 
                               start_date=start_date, 
                               end_date = end_date)
        
    
        stock_df.to_sql(name='stocks', con=engine, if_exists='append')



def get_stock_from_db(tickers):
    connection_string = 'hdjdaacogqimcu:a6007ea2abde788e2b86e856357cb8741377410b135800ea087bd2780f50e2fb@ec2-52-44-55-63.compute-1.amazonaws.com:5432/dbh8e6jsnrlr1k'
    engine = create_engine(f'postgresql://{connection_string}')
    
    # get the results from the datframe
    stock_df = pd.read_sql(sql='stocks', con=engine)
    
    # build the stock data
    stock_dict = {}
    for ticker in tickers['Ticker'].iteritems():
        ticker_df = stock_df[stock_df['ticker'] == ticker[1]].sort_values('date')
   
        price_list = []
        for index, row in ticker_df.iterrows():
            prices = [row['high'],row['close'],row['low']]
            price_list.append(prices)
        price_list.insert(0,ticker[1])
        
        stock_dict.update({ticker[1] : price_list})
    
    date_list = ticker_df['date'].astype(str).tolist()
    date_list.insert(0,'date') 
    stock_dict.update({'date' : date_list})

    
    return(stock_dict)


def main():
    load_stock_data(tickers)
    stock_data = get_stock_from_db(tickers)
    return(stock_data)
