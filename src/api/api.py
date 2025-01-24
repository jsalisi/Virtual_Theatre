from fastapi import FastAPI
from model import Images

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

image_list = []

@app.get("/api")
async def get_images():
    return {"Images": image_list}

@app.get("/api/{image_id}")
async def get_images(image_id: int):
    for image in image_list:
        if image.id == image_id:
            return {"Image": image}
    return {"message": "No image found"}

@app.post("/api")
async def upload_images(image: Images):
    image_list.append(image)
    return image

@app.get("/testimage")
async def get_images():
    return {"background_url": "https://vignette4.wikia.nocookie.net/club-penguin-rewritten/images/2/2a/Iceberg.png/revision/latest?cb=20170224125550"}
