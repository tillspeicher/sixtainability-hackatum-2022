import os
import json
import requests


def get_data(file_name):
    if "utils" in os.getcwd():
        file_path = os.getcwd() + "/../../data/" + file_name
    else:
        file_path = os.getcwd() + "/../data/" + file_name
    print(file_path)
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data


def get_google_latlng_data():
    from backend.config import API_KEY
    data = get_data("people.json")
    new_data = []
    for d in data:
        address = d["address"] + " Berlin"
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={API_KEY}"
        x = requests.get(url)

        try:
            if x.status_code == 200:
                address_components = x.json()
                coordinates = address_components["results"][0]["geometry"]["location"]
                formatted_address = address_components["results"][0]["formatted_address"]
                new_entry = {"id": d["id"], "name": d["name"], "address": formatted_address}
                new_entry.update(coordinates)
                new_data.append(new_entry)
            else:
                continue
        except Exception as e:
            print(e)
            continue
    print("lenght of new data", len(new_data))
    with open(os.getcwd() + "/../../data/people_v2.json", 'w') as f:
        json.dump(new_data, f)


def get_charging_stations():
    from backend.config import API_KEY
    data = get_data("people_v2.json")
    for d in data[:3]:
        lat = d["lat"]
        lng = d["lng"]
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat}%2C{lng}&radius=1500&type=chargingstation&keyword=chargingStation&key={API_KEY}"
        x = requests.get(url)
        print(x)


if __name__ == "__main__":
    # get_google_latlng_data()
    get_charging_stations()
