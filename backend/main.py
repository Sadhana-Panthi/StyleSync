from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pyngrok import ngrok
import nest_asyncio
import os
import uvicorn
from get_all_img import list_folder_images
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Database setup
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Database Model
class Dress(Base):
    __tablename__ = "dresses"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    cloth_url = Column(String, nullable=False)
    caption = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DesignRequest(BaseModel):
    prompt: str
    negative_prompt: str


@app.post("/gen_design")
async def gen_design(request: DesignRequest):
    prompt = request.prompt
    negative_prompt = request.negative_prompt

    headers = {"accept": "application/json", "Content-Type": "application/json"}

    data = {"prompt": prompt, "negative_prompt": negative_prompt}

    response_data = {
        "cloudinary_urls": "https://res.cloudinary.com/dbhckg5el/image/upload/v1732517742/test/tv33umoa0gbz1cqe6zpq.jpg"
    }

    return JSONResponse(content=response_data)

class InputURLs(BaseModel):
    person: str
    cloth: str


@app.post("/try_on1")
async def do_try_on(request: InputURLs):
    return {
        "cloudinary_urls": "https://res.cloudinary.com/dbhckg5el/image/upload/v1732517742/test/tv33umoa0gbz1cqe6zpq.jpg"
    }


# Input Model
class UploadRequest(BaseModel):
    image_url: str
    cloth_url: str
    caption: str


# Endpoint to upload new designs to socials
@app.post("/upload")
async def upload_new_design_to_socials(request: UploadRequest):
    db = SessionLocal()
    new_dress = Dress(
        image_url=request.image_url,
        cloth_url=request.cloth_url,
        caption=request.caption,
    )
    db.add(new_dress)
    db.commit()
    db.close()
    return {"message": "Posted on social media"}


# Endpoint to fetch all new dresses
@app.get("/dresses")
async def get_all_dresses():
    db = SessionLocal()
    dresses = db.query(Dress).all()
    db.close()
    return [
        {
            "id": dress.id,
            "image_url": dress.image_url,
            "cloth_url": dress.cloth_url,
            "caption": dress.caption,
            "timestamp": dress.timestamp.isoformat(),
        }
        for dress in dresses
    ]


class ImagesRequest(BaseModel):
    '''name = models gives all pictures of models, name = test gives models wearing our tshirts, name = shirts gives all shirts'''
    folder_name: str


# @app.post("/get_images")
# async def get_all_images_folder(request: ImagesRequest):
#     return list_folder_images(request.folder_name)


prompt = "Design a new light blue color t-shirt for men with geometric shape"


@app.get("/next_prompt")
async def get_prompt():
    return {"prompt": prompt, "time": "12am"}

class NextPrompt(BaseModel):
    prompt: str

@app.post("/next_prompt")
async def update_prompt(request: NextPrompt):
    global prompt
    prompt = request.prompt
    return {"message": "Next prompt updated"}

class FeedbackModel(BaseModel):
    pass
@app.post("/submit-feedback")
async def submit_design_feedback(feedback_data: FeedbackModel):
    # Process and store feedback
    # Update design analytics
    return {"status": "success"}

if __name__ == "__main__":
    os.environ["NGROK_AUTHTOKEN"] = "2ou2c1Bii8BIoxgpVvLbyrGRrhq_39atbrbFQZoZsf6o7MYsQ"
    ngrok_tunnel = ngrok.connect(8000)
    print("Public URL:", ngrok_tunnel.public_url)
    nest_asyncio.apply()
    uvicorn.run(app, port=8000)
