from fastapi import FastAPI
from recommender import recommend_videos, interaction_matrix

app = FastAPI()

@app.post("/recommend")
async def recommend(user_index: int, top_n: int = 2):
    """
    API endpoint to get recommended videos for a user.
    Args:
        user_index (int): Index of the target user in the interaction matrix.
        top_n (int): Number of recommendations to return.
    Returns:
        dict: Recommended video indices.
    """
    try:
        recommendations = recommend_videos(user_index, interaction_matrix, top_n)
        return {"recommendations": recommendations}
    except Exception as e:
        return {"error": str(e)}
