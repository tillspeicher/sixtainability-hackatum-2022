import random
from pprint import pprint

import flexpolyline as fp
import requests as requests
from flask import Flask, jsonify, request, render_template
from shapely.geometry import LineString
from utm import from_latlon, to_latlon, latlon_to_zone_number, latitude_to_zone_letter

from config import MUNICH_BBOX
from helpers import cut_line
from secrets_storage import HERE_API_KEY

app = Flask(__name__)


@app.route("/cut_route", methods=['POST'])
def cut_route():
    # [{
    #     "route": [[12, 34], [12, 34]],
    #     "distanceFrom": 10,
    #     "distanceTo": 20
    # }]
    json_data = request.get_json()

    result = []
    for part in json_data:
        utm_coordinates = []
        for coordinate in part['route']:
            utm_coordinate = from_latlon(coordinate[0], coordinate[1])
            utm_coordinates.append([utm_coordinate[0], utm_coordinate[1]])
        # Cut
        line = LineString(utm_coordinates)
        before, after = cut_line(line, part['distanceFrom'])
        before, after = cut_line(after, part['distanceTo'] - part['distanceFrom'])

        zone_number = latlon_to_zone_number(part['route'][0][0], part['route'][0][1])
        zone_letter = latitude_to_zone_letter(part['route'][0][0])
        if before:
            route = []
            for coordinate in before.coords:
                route.append(to_latlon(coordinate[0], coordinate[1], zone_number, zone_letter))
            result.append(route)
        else:
            result.append([])

    # [[[12, 34], [12, 34]]]
    return jsonify(result)


@app.route("/get_position_along_route", methods=['POST'])
def get_position_along_route():
    # [{
    #     "route": [[12, 34], [12, 34]],
    #     "distance": 10
    # }]
    json_data = request.get_json()

    result = []
    for pack in json_data:
        utm_coordinates = []
        for coordinate in pack['route']:
            utm_coordinate = from_latlon(coordinate[0], coordinate[1])
            utm_coordinates.append([utm_coordinate[0], utm_coordinate[1]])
        line = LineString(utm_coordinates)
        position = line.interpolate(pack['distance'])
        lat, lon = to_latlon(position.coords[0][0], position.coords[0][1], latlon_to_zone_number(pack['route'][0][0],
                                                                                                 pack['route'][0][1]),
                             latitude_to_zone_letter(pack['route'][0][0]))
        result.append([lat, lon])

    # [[12, 34]]
    return jsonify(result)


@app.route("/get_random_car_positions", methods=['POST'])
def get_random_car_positions():
    # 10
    json_data = request.get_json()
    positions = []
    for car in range(json_data):
        positions.append([random.uniform(MUNICH_BBOX[0][0], MUNICH_BBOX[1][0]),
                          random.uniform(MUNICH_BBOX[0][1], MUNICH_BBOX[1][1])])

    # [[12, 34], [12, 34]]
    return jsonify(positions)


@app.route("/route_a_b", methods=['POST'])
def route_a_b():
    # {
    #     "start": [12, 34],
    #     "destination": [12, 34]
    # }
    json_data = request.get_json()

    response = requests.get("https://router.hereapi.com/v8/routes?"
                            "transportMode=car&"
                            f"origin={json_data['start'][0]},{json_data['start'][1]}&"
                            f"destination={json_data['destination'][0]},{json_data['destination'][1]}&"
                            "return=polyline&"
                            f"apikey={HERE_API_KEY}").json()

    coordinates = fp.decode(response['routes'][0]['sections'][0]['polyline'])
    utm_coordinates = []
    for coordinate in coordinates:
        utm_coordinate = from_latlon(coordinate[0], coordinate[1])
        utm_coordinates.append([utm_coordinate[0], utm_coordinate[1]])
    line = LineString(utm_coordinates)

    # {
    #     "route": [[12, 34], [12, 34]],
    #     "routeDistance": 123
    # }
    return jsonify({
        "route": coordinates,
        "routeDistance": line.length
    })


@app.route("/route_a_random", methods=['POST'])
def route_a_random():
    # [12, 34]
    json_data = request.get_json()

    destination = [random.uniform(MUNICH_BBOX[0][0], MUNICH_BBOX[1][0]),
                   random.uniform(MUNICH_BBOX[0][1], MUNICH_BBOX[1][1])]
    response = requests.get("https://router.hereapi.com/v8/routes?"
                            "transportMode=car&"
                            f"origin={json_data[0]},{json_data[1]}&"
                            f"destination={destination[0]},{destination[1]}&"
                            "return=polyline&"
                            f"apikey={HERE_API_KEY}").json()

    coordinates = fp.decode(response['routes'][0]['sections'][0]['polyline'])

    utm_coordinates = []
    for coordinate in coordinates:
        utm_coordinate = from_latlon(coordinate[0], coordinate[1])
        utm_coordinates.append([utm_coordinate[0], utm_coordinate[1]])
    line = LineString(utm_coordinates)

    # {
    #     "route": [[12, 34], [12, 34]],
    #     "routeDistance": 123
    # }
    return jsonify({
        "route": coordinates,
        "routeDistance": line.length
    })


@app.route("/choose_car", methods=['POST'])
def choose_car():
    # {
    #     "cars": [
    #         {
    #             "id": 1,
    #             "position": [48.158477569400674, 11.57088862592676]
    #         },
    #         {
    #             "id": 2,
    #             "position": [48.164134174149986, 11.569008708505638]
    #         }
    #     ],
    #     "destination": [48.15948445406489, 11.565948696936951]
    # }
    json_data = request.get_json()

    request_data = {
        "origins": [{
            "lat": car['position'][0],
            "lng": car['position'][1]
        } for car in json_data['cars']],
        "destinations": [{
            "lat": json_data['destination'][0],
            "lng": json_data['destination'][1]
        }],
        "regionDefinition": {
            "type": "world"
        },
        "matrixAttributes": ["distances"]
    }

    response = requests.post("https://matrix.router.hereapi.com/v8/matrix?"
                             "async=false&"
                             f"apikey={HERE_API_KEY}",
                             json=request_data).json()

    min_travel_duration = float("inf")
    min_i = None
    for i, duration in enumerate(response['matrix']['distances']):
        if duration < min_travel_duration:
            min_travel_duration = duration
            min_i = i

    # 123
    return jsonify(json_data['cars'][min_i]['id'])


@app.route("/")
def get_map():
    return render_template("map.html")
