import uvicorn
if __name__ == "__main__":

    # even though uvicorn is running on 0.0.0.0 check 127.0.0.1 from the browser

    uvicorn.run("app.app:app", host="0.0.0.0", port=8000, log_level="debug",
                    proxy_headers=True, reload=True)
