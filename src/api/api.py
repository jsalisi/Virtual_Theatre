from typing import Annotated
from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import aiofiles

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

image_list = []

@app.get("/api/")
async def get_images():
    return {"Images": image_list}

@app.post("/api/upload/")
async def create_upload_file(file: UploadFile):
    out_file_path = "./" + file.filename
    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    return {"Result": out_file_path}
