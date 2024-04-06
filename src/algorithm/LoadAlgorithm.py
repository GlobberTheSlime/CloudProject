import joblib
import numpy as np
import requests
from sklearn.ensemble import GradientBoostingRegressor
from flask import *
from flask_cors import CORS  # Import CORS from flask_cors module

from Extractor import Extractor

def get_public_ip():
    try:
        response = requests.get('https://api.ipify.org')
        if response.status_code == 200:
            return response.text
        else:
            print("Failed to retrieve public IP:", response.status_code)
    except Exception as e:
        return "localhost"
print (get_public_ip())
app = Flask(__name__)
CORS(app)



def get_data(url):
    response = requests.get(url)
    readings_map = {}
    if response.status_code == 200:
        data = response.json()
        if 'metadata' in data and 'stations' in data['metadata']:
            stations = data['metadata']['stations']
            stations_map = process_stations(stations)

        if 'items' in data:
            items = data['items']
            if 'readings' in items[0]:
                readings = items[0]['readings']
                for reading in readings:
                    readings_map[stations_map[reading['station_id']]] = reading['value']
    else:
        print(f"Failed to fetch data")
    return readings_map

def process_stations(stations_data):
    unique_stations = {}
    for station in stations_data:
        pos = station['location']
        unique_stations[station['id']] = (pos['latitude'], pos['longitude'])
    return unique_stations

def get_in_cluster(data:dict, clusters):
    arr = []
    for cluster in clusters:
        for pos, value in data.items():
            if cluster.in_hull(pos):
                arr.append(value)
    return np.array(arr)

@app.route('/invoke-function', methods=['POST'])
def invoke_function():
    # Retrieve the function parameters from the request
    data = request.json
    # Call the function with the parameters
    result = get_prediction(data['long'], data['lat'])
    return {'result': result}

#If invalid lat long was provided, throw an error
def get_prediction(long, lat):
    clusters = extractor.get_clusters(long, lat)
    if len(clusters) == 0:
        return 0
    temp_arr = get_in_cluster(temp_data,clusters)
    humidity_arr = get_in_cluster(humidity_data,clusters)
    rainfall_arr = get_in_cluster(rainfall_data,clusters)
    density_arr = []

    # Iterate over clusters
    for cluster in clusters:
        # Append cluster density to density_arr
        density_arr.append(cluster.density)

    # Convert the list to a NumPy array
    density_arr = np.array(density_arr)

    # Calculate the mean density
    density = density_arr.mean()

    rainfall = 0
    temp = 32
    humidity = 60
    if humidity_arr.size != 0:
        humidity = humidity_arr.mean()
    if temp_arr.size != 0:
        temp = temp_arr.mean()
    if rainfall_arr.size != 0:
        rainfall = rainfall_arr.mean()

    data_array = [[rainfall, temp, humidity, density]]
    print(f"Data {data_array}")
    if density == 0:
        return 0

    cases = gradient.predict(data_array)[0]

    case_percent = cases/extractor.highest_cases

    density_percent = density/extractor.highest_cases

    return case_percent * density_percent


humidity_url = 'https://api.data.gov.sg/v1/environment/relative-humidity'
temp_url = 'https://api.data.gov.sg/v1/environment/air-temperature'
rainfall_url = 'https://api.data.gov.sg/v1/environment/rainfall'
#if none in cluster , use average
temp_data = get_data(temp_url)
#if none in cluster, use average
humidity_data = get_data(humidity_url)
#if none in cluster, assume 0 rainfall
rainfall_data = get_data(rainfall_url)

gradient: GradientBoostingRegressor = joblib.load('gradient.pkl')
extractor: Extractor = joblib.load('extractor.pkl')
get_prediction(103.9,1.39)
app.run(host='0.0.0.0', port=5000)# Run the Flask app