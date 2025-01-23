from fastapi import FastAPI, Request
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

@app.get("/recommend")
async def recommend_videos(request: Request):
    data = await request.json()
    interaction_matrix = np.array(data["interaction_matrix"])
    user_index = data["user_index"]
    top_n = data.get("top_n", 5)

    # Calculate similarity
    user_similarity = cosine_similarity(interaction_matrix)
    similar_users = user_similarity[user_index]
    predicted_scores = similar_users.dot(interaction_matrix)
    predicted_scores[interaction_matrix[user_index] > 0] = 0
    recommended_video_indices = predicted_scores.argsort()[-top_n:][::-1]

    return {"recommended_video_ids": recommended_video_indices.tolist()}
