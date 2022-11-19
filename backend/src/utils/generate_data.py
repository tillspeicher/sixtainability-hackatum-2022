import requests
import os

from utils.utilities import *
from backend.config import API_KEY


def get_google_latlng_data():
    data = read_json("sixt_stations.json")
    new_data = []
    for d in data:
        address = d["subtitle"]
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={API_KEY}"
        x = requests.get(url)

        try:
            if x.status_code == 200:
                address_components = x.json()
                coordinates = address_components["results"][0]["geometry"]["location"]

                d.update(coordinates)
                new_data.append(d)
            else:
                continue
        except Exception as e:
            print(e)
            continue
    print("length of new data", len(new_data))
    with open(os.getcwd() + "/../../data/sixt_stations_v2.json", 'w') as f:
        json.dump(new_data, f)


def preprocess_coordinates():
    file_name = os.getcwd() + "/../../data/coordinates.txt"
    with open(file_name) as f:
        lines = f.readlines()
    coordinates = []
    for line in lines:
        lat, lng = line.split(" ")
        lng = lng.replace("\n", "")
        lat = float(lat)
        lng = float(lng)
        dictionary = {"lat": lat, "lng": lng}
        coordinates.append(dictionary)
    with open(os.getcwd() + "/../../data/coordinates.json", 'w') as f:
        json.dump(coordinates, f)


def generate_addresses():
    coordinates = read_json("coordinates.json")
    new_coordinates = []
    for coordinate in coordinates:
        lat = coordinate["lat"]
        lng = coordinate["lng"]
        url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={API_KEY}"
        response = requests.get(url)
        try:
            if response.status_code == 200:
                response = response.json()
                # new_entry = coordinate
                formatted_address = response["results"][0]["formatted_address"]
                coordinate.update({"address": formatted_address})
                new_coordinates.append(coordinate)
            else:
                continue
        except Exception as e:
            continue
    print("length of new data", len(new_coordinates))
    with open(os.getcwd() + "/../../data/coordinates_v2.json", 'w') as f:
        json.dump(new_coordinates, f)


def combine_with_people_data():
    people_data = read_json("people.json")
    coordinates = read_json("coordinates_v2.json")

    for (person, coordinate) in zip(people_data,coordinates):
        person.update(coordinate)
        person.pop("_id")
    print("length of new data", len(people_data))
    with open(os.getcwd() + "/../../data/people_v3.json", 'w') as f:
        json.dump(people_data, f)


def get_charging_stations():
    data = read_json("people_v3.json")
    charging_stations = []
    for d in data:
        lat = d["lat"]
        lng = d["lng"]
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat}%2C{lng}&radius=1500&type=chargingstation&keyword=chargingStation&key={API_KEY}"
        response = requests.get(url)
        try:
            if response.status_code == 200:
                response = response.json()
                response = response["results"]
                lat = response[0]["geometry"]["location"]["lat"]
                lng = response[0]["geometry"]["location"]["lng"]
                name = response[0]['name']
                vicinity = response[0]['vicinity']
                rating = response[0]['rating']
                user_ratings_total = response[0]['user_ratings_total']
                station = {"name": name, "lat":lat, "lng":lng, "vicinity": vicinity, "rating":rating, "user_ratings_total":user_ratings_total}
                charging_stations.append(station)
            else:
                continue
        except Exception as e:
            continue
    print("length of new data", len(charging_stations))
    with open(os.getcwd() + "/../../data/charging_stations.json", 'w') as f:
        json.dump(charging_stations, f)


def get_sixt_stations():
    location = "Munich"
    url = f"https://api.orange.sixt.com/v1/locations?term=Munich&vehicleType=car&type=station"
    response = requests.get(url)
    try:
        if response.status_code == 200:
            response = response.json()
    except Exception as e:
        print(e)
    print("length of new data", len(response))
    with open(os.getcwd() + "/../../data/sixt_stations.json", 'w') as f:
        json.dump(response, f)


if __name__ == "__main__":
    get_google_latlng_data()
    # get_charging_stations()
    # preprocess_coordinates()
    # generate_addresses()
    # combine_with_people_data()
    # get_sixt_stations()