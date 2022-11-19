from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils.utilities import *

app = FastAPI(title="Sixtainability API")

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "*",
    "http://127.0.0.1:8089/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def read_main():
    return {"msg": "Hello World !!!!"}


@app.get("/get_user_by_id")
async def get_user(user_id: str):
    data = read_json("people_v3.json")
    user = list(filter(lambda p_id: p_id["id"] == user_id, data))[0]
    return user


@app.get("/get_sixt_stations")
async def get_stations():
    stations = read_json("sixt_stations_v2.json")
    return stations


@app.get("/get_charging_stations")
async def get_charging_stations():
    charging_stations = read_json("charging_stations.json")
    return charging_stations


@app.get("/get_all_users")
async def get_all_users():
    users = read_json("people_v3.json")
    return users

