🧠 Smart Recipe Generator
🍴 Overview

The Smart Recipe Generator is a full-stack MERN (MongoDB, Express, React, Node.js) web application that helps users search, view, and save recipes based on their preferences or available ingredients. It combines locally stored recipes with live data from the Forkify API, enabling users to explore new dishes dynamically.

Users can sign up, log in, rate recipes, and mark their favorites. The app supports real-time interaction, responsive design, and personalized experiences.

🚀 Live Demo

Frontend (Vercel Deployment):
🔗 https://smart-recipe-sugges-git-0d6bae-dheeraj-kumars-projects-a90fdcd1.vercel.app/

Backend (Render Deployment):
🔗 https://smart-recipe-suggestion.onrender.com


⚙️ Tech Stack

Frontend:

React.js

Tailwind CSS

Axios

Lucide Icons

Backend:

Node.js

Express.js

MongoDB (Mongoose ORM)

Forkify API integration

dotenv, CORS

Deployment:

Vercel (Serverless Functions + Frontend Hosting)

MongoDB Atlas (Cloud Database)

🧩 Features

🍽️ Search recipes by ingredients or cuisine

❤️ Save and manage favorite recipes

⭐ Rate recipes locally

🔎 Fetch external recipes via Forkify API

👤 User authentication

📱 Responsive UI for mobile & desktop

☁️ Deployed on Vercel (frontend + backend)

🛠️ Setup Instructions
1. Clone the Repository
git clone [https://github.com/<your-username>/smart-recipe-generator.git](https://github.com/485518110dheerajkumar/Smart_Recipe_Suggestion.git)
cd smart-recipe-generator

2. Install Dependencies
cd backend
npm install
cd ../frontend
npm install

3. Add Environment Variables

Create a .env file inside the backend folder:

MONGO_URI=<your_mongodb_connection_string>
FORKIFY_BASE=https://forkify-api.herokuapp.com/api/v2

4. Run Locally
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start


The app will run on
Frontend: http://localhost:3000

Backend: http://localhost:5000

🌍 Deployment (Vercel CLI)
vercel login
vercel
vercel --prod


Your backend API routes (like /api/favorites and /api/recipes) are deployed as serverless functions.

🧾 Approach (200 Words)

The Smart Recipe Generator is a full-stack MERN application that enables users to discover and manage recipes intelligently. The backend is built with Node.js, Express, and MongoDB, exposing REST APIs for recipes, authentication, and favorites. It integrates with the Forkify API to dynamically fetch recipes when local data is insufficient.

The frontend is developed using React and Tailwind CSS, delivering a clean, responsive, and interactive user interface. Users can log in, browse recipes, rate them, and save their favorites. Recipe data and user preferences are stored in MongoDB Atlas, ensuring persistence and scalability.

For deployment, the backend was adapted into serverless functions to run efficiently on Vercel, removing the need for a dedicated server. The system implements error handling, input validation, and RESTful API principles to maintain reliability and robustness. The project showcases API integration, cloud deployment, and seamless frontend-backend communication.
