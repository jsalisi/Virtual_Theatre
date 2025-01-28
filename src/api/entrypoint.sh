#!/bin/bash
set -e
python3 -m pip install --upgrade pip
python3 -m pip install -e src
python3 src/api/api.py
python3 -m gunicorn api:app