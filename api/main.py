import os
import uvicorn

from dotenv import load_dotenv
from fastapi import FastAPI,  Request, UploadFile, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates

from model.api_auth import get_api_key
from model.api_auth import upload_to_azure

load_dotenv()

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
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
    return ("Api Key Check: Success")

# Upload Route
@app.post("/api/upload")
async def create_upload_file(file: UploadFile, api_key: str = Security(get_api_key)):
    name = file.filename
    type = file.content_type
    is_prod = eval(os.getenv("IS_PROD"))
    return await upload_to_azure(file, name, type, is_prod)

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=3100, reload=True)