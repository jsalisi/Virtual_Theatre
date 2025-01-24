from fastapi import FastAPI
from pydantic import BaseModel

class Images(BaseModel):
    id: int
    filename: str