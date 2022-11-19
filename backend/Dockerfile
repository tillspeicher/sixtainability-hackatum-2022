FROM python:3-buster
RUN pip install --upgrade pip
WORKDIR /backend
COPY ./requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

ADD ./src ./backend/src
COPY ./data/people_v3.json ./backend/data/people_v3.json
COPY ./data/charging_stations.json ./backend/data/charging_stations.json

#CMD ["python", "src/main.py"]
WORKDIR /backend/src
CMD gunicorn -w 3 -k uvicorn.workers.UvicornWorker app.app:app --bind 0.0.0.0:8000



