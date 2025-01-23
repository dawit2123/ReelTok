import { database } from "@/libs/AppWriteClient";
import { account } from "@/libs/AppWriteClient";
import useGetProfileByUserId from "./useGetProfileByUserId";
import useGetRecommendations from "./useGetRecommendations";

const useGetAllPosts = async () => {
  try {
    const currentSession = await account.getSession("current");
    if (!currentSession) return;

    const promise = (await account.get()) as any;
    const currentUserIndex = promise?.$id;

    // Fetch all posts and likes
    const postsResponse = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST)
    );

    const likesResponse = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE)
    );

    // Generate user and video lists
    const userIds = [
      ...new Set(likesResponse.documents.map((like) => like.user_id)),
    ];
    const videoIds = postsResponse.documents.map((post) => post.$id);

    // Create interaction matrix
    const interactionMatrix = userIds.map((userId) =>
      videoIds.map((videoId) =>
        likesResponse.documents.some(
          (like) => like.user_id === userId && like.post_id === videoId
        )
          ? 1
          : 0
      )
    );

    try {
      // Send the interaction matrix to the backend
      const res: Response = await useGetRecommendations(
        interactionMatrix,
        currentUserIndex,
        5
      );
      console.log("result", res);

      const { recommended_video_ids } = await res.json();

      // Filter posts using the recommended video IDs
      const filteredPosts = postsResponse.documents.filter((doc) =>
        recommended_video_ids.includes(videoIds.indexOf(doc.$id))
      );

      // Map filtered posts to include user profiles
      const objPromises = filteredPosts.map(async (doc) => {
        const profile = await useGetProfileByUserId(doc?.user_id);

        return {
          id: doc?.$id,
          user_id: doc?.user_id,
          video_url: doc?.video_url,
          text: doc?.text,
          created_at: doc?.created_at,
          profile: {
            user_id: profile?.user_id,
            name: profile?.name,
            image: profile?.image,
          },
        };
      });

      const result = await Promise.all(objPromises);
      return result;
    } catch (recommendationError) {
      console.warn(
        "Failed to fetch recommended posts. Returning all posts instead.",
        recommendationError
      );

      // Map all posts to include user profiles if recommendations fail
      const allPostsPromises = postsResponse.documents.map(async (doc) => {
        const profile = await useGetProfileByUserId(doc?.user_id);

        return {
          id: doc?.$id,
          user_id: doc?.user_id,
          video_url: doc?.video_url,
          text: doc?.text,
          created_at: doc?.created_at,
          profile: {
            user_id: profile?.user_id,
            name: profile?.name,
            image: profile?.image,
          },
        };
      });

      const allPosts = await Promise.all(allPostsPromises);
      return allPosts;
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export default useGetAllPosts;
