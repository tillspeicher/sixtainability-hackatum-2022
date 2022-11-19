FROM python:3-buster
RUN pip install --upgrade pip
WORKDIR /backend
COPY ./requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./src /backend/src
COPY ./data /backend/data

#CMD ["python", "src/main.py"]
WORKDIR /backend/src
CMD gunicorn -w 3 -k uvicorn.workers.UvicornWorker app.app:app --bind 0.0.0.0:8000



