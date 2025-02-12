import os
import uvicorn
import aiohttp

from dotenv import load_dotenv, dotenv_values
from typing import Annotated
from fastapi import FastAPI,  Request, status, Form, UploadFile, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from azure.storage.blob.aio import BlobServiceClient

from model.api_auth import get_api_key

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
    return {"API Key": api_key}

# Upload Route
@app.post("/api/upload/")
async def create_upload_file(file: UploadFile, api_key: str = Security(get_api_key)):
    name = file.filename
    type = file.content_type
    return await uploadtoazure(file,name,type)

async def uploadtoazure(file: UploadFile,file_name: str,file_type:str):
    connect_str = os.environ.get("CONNECTION_STRING")
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_name = "vtheatre-image-storage"
    async with blob_service_client:
            container_client = blob_service_client.get_container_client(container_name)
            try:
                blob_client = container_client.get_blob_client(file_name)
                f = await file.read()
                await blob_client.upload_blob(f, overwrite=True)
            except Exception as e:
                print(e)
                return HTTPException(401, "Something went terribly wrong..")
    
    return ("{url}/{filename}".format(url=os.environ.get("BASE_IMAGE_URL"), filename=file_name))

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=3100)