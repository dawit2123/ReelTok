import axios from "axios";
import useGetAllPosts from "./useGetAllPosts";

const useGetRecommendations = async (
  interactionMatrix: any,
  userIndex: number,
  topN: number = 5
) => {
  let allPosts: any[] = [];
  try {
    // Try to fetch recommendations from the backend
    const response = await axios.post(process.env.NEXT_PUBLIC_AI_URL || "", {
      interaction_matrix: interactionMatrix,
      user_id: userIndex,
      top_n: 5,
    });
    console.log("Recommendations fetched successfully:", response.data);

    const recommendations = response.data.recommendations; // Array of recommended video IDs

    // Check if recommendations are available
    if (recommendations && recommendations.length > 0 && recommendations.ok) {
      return recommendations;
    } else {
      console.warn("No recommendations found. Falling back to all posts.");
      allPosts = (await useGetAllPosts()) || [];
      return allPosts.map((post) => post.id); // Return all post IDs
    }
  } catch (error) {
    console.error(
      "Failed to fetch recommendations, falling back to all posts:",
      error
    );
    try {
      const allPosts = (await useGetAllPosts()) || [];
      return allPosts.map((post) => post.id); // Return all post IDs
    } catch (fallbackError) {
      console.error("Failed to fetch all posts as a fallback:", fallbackError);
      throw fallbackError;
    }
  }
};

export default useGetRecommendations;
