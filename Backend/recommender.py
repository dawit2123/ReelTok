import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Simulated user-video interaction matrix
# Replace this with data fetched from your database
interaction_matrix = np.array([
    [1, 0, 1, 0, 0], 
    [1, 1, 0, 0, 0],  
    [0, 1, 1, 0, 0],  
    [0, 0, 1, 1, 1], 
])

def recommend_videos(user_index, interaction_matrix, top_n=2):
    """
    Recommend videos for a given user based on collaborative filtering.
    Args:
        user_index (int): Index of the target user in the interaction matrix.
        interaction_matrix (numpy.ndarray): User-video interaction matrix.
        top_n (int): Number of recommendations to return.
    Returns:
        list: Indices of recommended videos.
    """
    # Calculate similarity between users
    user_similarity = cosine_similarity(interaction_matrix)

    # Get the similarity scores for the target user
    similar_users = user_similarity[user_index]

    # Predict video preferences by weighting interactions by similarity scores
    predicted_scores = similar_users.dot(interaction_matrix)

    # Exclude videos already interacted with by the user
    predicted_scores[interaction_matrix[user_index] > 0] = 0

    # Get the indices of the top N recommended videos
    recommended_videos = predicted_scores.argsort()[-top_n:][::-1]

    return recommended_videos.tolist()
