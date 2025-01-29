#!/bin/bash
set -e
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m uvicorn api:app --host 0.0.0.0