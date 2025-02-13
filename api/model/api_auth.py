import os, json

from fastapi import HTTPException, status, Security, UploadFile
from fastapi.security import APIKeyHeader, APIKeyQuery
from azure.identity import DefaultAzureCredential
from azure.storage.blob.aio import BlobServiceClient

from dotenv import load_dotenv

load_dotenv()

API_KEYS = os.getenv("API_KEY").split(',')

api_key_query = APIKeyQuery(name="api-key", auto_error=False)
api_key_header = APIKeyHeader(name="x-api-key", auto_error=False)

def get_api_key(
    api_key_query: str = Security(api_key_query),
    api_key_header: str = Security(api_key_header),
) -> str:
    if api_key_query in API_KEYS:
        return api_key_query
    if api_key_header in API_KEYS:
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )

async def upload_to_azure(file: UploadFile, file_name: str, file_type: str, is_prod: bool):
    if is_prod:
        token_credential = DefaultAzureCredential()
        blob_service_client = BlobServiceClient(
            account_url = os.getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT"),
            credential = token_credential)
    else:
        blob_service_client = BlobServiceClient.from_connection_string(os.getenv("CONNECTION_STRING"))
    
    container_name = os.getenv("CONTAINER_NAME")
    async with blob_service_client:
            container_client = blob_service_client.get_container_client(container_name)
            try:
                blob_client = container_client.get_blob_client(file_name)
                file_to_upload = await file.read()
                await blob_client.upload_blob(file_to_upload, overwrite=True)
            except Exception as e:
                print(e)
                return HTTPException(401, "Something went terribly wrong..")
    
    return (os.getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT") + f"{container_name}/{file_name}")
