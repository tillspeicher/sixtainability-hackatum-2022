import os
import json
import requests

from backend.config import API_KEY


def get_data(file_name):
    if "utils" in os.getcwd():
        file_path = os.getcwd() + "/../../data/" + file_name
    else:
        file_path = os.getcwd() + "/../data/" + file_name
    print(file_path)
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data


def get_google_data():
    data = get_data("people.json")
    new_data = []
    for d in data:
        address = d["address"] + " Berlin"
        URL = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={API_KEY}"
        x = requests.get(URL)

        try:
            if x.status_code == 200:
                address_components = x.json()
                coordinates = address_components["results"][0]["geometry"]["location"]
                formatted_address = address_components["results"][0]["formatted_address"]
                new_entry = {"id": d["id"], "name": d["name"],  "address": formatted_address}
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


if __name__ == "__main__":
    get_google_data()