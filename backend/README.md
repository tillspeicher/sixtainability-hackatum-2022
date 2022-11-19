## Running the Backend using Docker

* `docker build --no-cache -t myfastapiimage .
`
* `docker run --name myfastapiimage -it -v /Users/ashmi/Scripts/open-source/hackatum-2022/backend:/backend -p 8000:8000  myfastapiimage` 