import os
import json


def read_json(file_name):
    if "utils" in os.getcwd():
        file_path = os.getcwd() + "/../../data/" + file_name
    else:
        file_path = os.getcwd() + "/../data/" + file_name
    print(file_path)
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data


