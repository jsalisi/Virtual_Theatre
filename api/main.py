import os
import uvicorn
import aiohttp

from dotenv import load_dotenv, dotenv_values
from typing import Annotated
from fastapi import FastAPI,  Request, status, Form, UploadFile, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from model.api_auth import get_api_key
from model.api_auth import upload_to_azure

load_dotenv()

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Default Route
@app.get("/")
async def index(request: Request):
    print('Request for index page received')
    return templates.TemplateResponse('index.html', {"request": request})

# Test Route
@app.get("/api")
async def get_api_auth(api_key: str = Security(get_api_key)):
    return (f"Api Key: ${api_key}")

# Upload Route
@app.post("/api/upload")
async def create_upload_file(file: UploadFile, api_key: str = Security(get_api_key)):
    name = file.filename
    type = file.content_type
    return await upload_to_azure(file,name,type)

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=3100, reload=True)