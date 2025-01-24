# 🎥 ReelTok - AI-Powered Video Recommendation System

<img src="https://img.shields.io/badge/-Solo%20Project-f2336f?&style=for-the-badge&logoColor=white" />

## 🌟 Project Vision

Welcome to **ReelTok**! This cutting-edge platform uses advanced AI-driven recommendation algorithms to provide users with personalized video suggestions. By analyzing user interaction data, ReelTok predicts and suggests the most relevant content, enhancing user engagement. It’s designed to scale, providing accurate recommendations even for large user bases, ensuring a seamless viewing experience.

---

## 🚀 How It Works

The **ReelTok** recommendation system operates in several key stages to provide users with accurate and engaging video recommendations:

1. **User Interaction Data**  
   Users interact with videos, and their interactions (likes, watch time, comments) are stored in an interaction matrix. This data serves as the foundation for the recommendation system.

2. **Recommendation Model**  
   The backend uses machine learning algorithms (such as collaborative filtering) to analyze the interaction data and generate personalized recommendations. This step ensures that each user receives video suggestions tailored to their interests.

3. **Frontend Interaction**  
   The React frontend allows users to interact with the system, request recommendations, and view suggested videos. The user can select a video from the recommended list, which will then play within the application.

4. **Backend API**  
   The backend, built with **FastAPI** and **AppWrite**, processes user requests and handles the video recommendation generation. FastAPI serves as the API layer that integrates with the recommendation engine to provide dynamic recommendations.

5. **Live Recommendations**  
   Once the user provides their interaction data (e.g., which videos they interacted with), the recommendation engine fetches the top video recommendations based on their preferences.

---

## 🖼 Demo Screenshots

### Home Page

![Home Page](https://github.com/dawit2123/ReelTok/blob/main/Demo/home_page.png)
![Home Page2](https://github.com/dawit2123/ReelTok/blob/main/Demo/home_page2.png)

### Upload Video

![Upload Video](https://github.com/dawit2123/ReelTok/blob/main/Demo/upload_video.png)

# Edit Profile

![Edit profile](https://github.com/dawit2123/ReelTok/blob/main/Demo/edit_profile.png)
