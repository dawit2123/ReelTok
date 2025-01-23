from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from recommender import recommend_videos

# Initialize the FastAPI app
app = FastAPI()

# CORS middleware configuration
origins = [
    "http://localhost:3000",  # Your frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define Pydantic model for request data validation
class RecommendationRequest(BaseModel):
    interaction_matrix: List[List[int]]  # 2D matrix of integers
    user_id: str
    top_n: int = 2  # Default to 2 if not provided

@app.post("/recommend")
async def recommend(request: RecommendationRequest):
    """
    API endpoint to get recommended videos for a user.
    Args:
        user_id (str): String-based user ID.
        top_n (int): Number of recommendations to return.
    Returns:
        dict: Recommended video indices.
    """
    try:
        # Dynamically map the user ID to an index
        user_index = get_user_index(request.user_id)
        
        # Get recommendations for the user
        recommendations = recommend_videos(user_index, request.interaction_matrix, request.top_n)
        return {"recommendations": recommendations}
    except Exception as e:
        return {"error": str(e)}

# Example root route
@app.get("/")
async def root():
    return {"message": "Hello World"}
