# 🧠 GenAI — AI Image Generator Web App
GenAI is a full-stack web application that allows users to generate AI-powered images using prompts, view posts created by others in the community, and create their own posts. This project utilizes HuggingFace's FLUX.1-dev model, Cloudinary for image storage, and MongoDB for data persistence.


# 🚀 Features
🔍 Search community posts by name or prompt

🎨 Generate stunning AI images from text prompts

📤 Upload generated images to Cloudinary

🗃️ View and explore recent and popular posts

📌 Create your own image post and share it with others

💡 Responsive and modern UI built with React and Styled Components

# 🛠 Tech Stack
## Frontend
React.js

Styled Components

Material UI (for loading indicators and icons)

Axios

## Backend
Node.js

Express.js

Cloudinary (for image hosting)

HuggingFace API (for AI image generation)

MongoDB & Mongoose (for database)

# Screenshots
![Screenshot 2025-06-19 130600](https://github.com/user-attachments/assets/18f9ea09-0f54-4ba1-a603-dff007981b42)

![Screenshot 2025-06-19 130615](https://github.com/user-attachments/assets/8a47ceab-79a4-4435-8531-72b2bd40e337)

# 🌐 Getting Started
## Prerequisites
Node.js (v14+)

MongoDB Atlas or local instance

HuggingFace API Token

Cloudinary account (for image uploads)


1. Clone the repository
   
   git clone https://github.com/your-username/AI-Image-Generator.git
   
   cd AI-Image-Generator


3. Set up the backend
   
-cd server
   
-npm install

- Create a .env file in the server/ directory:

     MONGODB_URL=your_mongodb_connection_string
   
     HUGGINGFACE_API_TOKEN=your_huggingface_token
  
     CLOUDINARY_CLOUD_NAME=your_cloud_name
  
     CLOUDINARY_API_KEY=your_api_key
  
     CLOUDINARY_API_SECRET=your_api_secret

- Start backend server:
  
     npm start



3. Set up the frontend
   
    cd ../client
   
    npm install

    npm start
   

# 🧠 Future Improvements
Add user authentication

Like and comment system for posts

Pagination and infinite scroll

Prompt recommendations
