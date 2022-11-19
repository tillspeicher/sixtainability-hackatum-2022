import time
from pprint import pprint

import requests

# host = "20.79.222.49"
host = "127.0.0.1"

while True:
    response = requests.post(f"http://{host}:3000/car/update-cars")
    pprint(response)
    time.sleep(0.5)
