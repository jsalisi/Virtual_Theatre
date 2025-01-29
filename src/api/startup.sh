#!/bin/bash

echo "Using virtual environment named 'virtual-theatre-api'.."

export PYTHONPATH=$PYTHONPATH:"/home/site/wwwroot/api/antenv/lib/python3.12/site-packages"

gunicorn --worker-class uvicorn.workers.UvicornWorker -b 0.0.0.0:8080 --timeout 600 --access-logfile '-' --error-logfile '-' api:app