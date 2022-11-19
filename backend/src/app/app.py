from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from glob import glob
import os
# print(glob(os.getcwd() +"/*/", recursive = True))
#
# print(os.getcwd())
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


@app.get("/get_user")
async def get_people(user_id: str):
    data = read_json("people_v3.json")
    user = list(filter(lambda p_id: p_id["id"] == user_id, data))[0]
    return user


@app.get("/get_area")
async def get_people():
    return {"msg": "Get area !!!!"}
