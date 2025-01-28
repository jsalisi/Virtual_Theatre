pip3 install -r requirements.txt
python3 -m gunicorn api:app -b 0.0.0.0:80