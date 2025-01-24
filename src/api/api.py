from typing import Annotated
from fastapi import FastAPI, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from azure.storage.blob.aio import BlobServiceClient

import aiohttp
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/upload/")
async def create_upload_file(file: UploadFile):
    name = file.filename
    type = file.content_type
    return await uploadtoazure(file,name,type)

async def uploadtoazure(file: UploadFile,file_name: str,file_type:str):
    connect_str = os.getenv("CONNECTION_STRING")
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
    
    return ("{url}/{filename}".format(url=os.getenv("BASE_IMAGE_URL"), filename=file_name))