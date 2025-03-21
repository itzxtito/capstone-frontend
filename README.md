

```md
# Recipe App 🍽️

## Overview
This is a full-stack **React & Node.js recipe app** that allows users to **browse, save, and manage favorite recipes**. The project showcases API integration and MongoDB database functionality.

## Features
✅ **Browse Recipes** – View a list of recipes from MongoDB  
✅ **Recipe Details** – Click a recipe to view ingredients & instructions  
✅ **Save Favorites** – Save recipes to a user profile  
✅ **MongoDB Database** – Recipes and favorites stored in MongoDB  

## Tech Stack
- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB (Mongoose ORM)

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/itzxtito/capstone-frontend.git
   cd recipe-app
   ```

2. **Install backend dependencies & start the server:**
   ```sh
   cd backend
   npm install
   node server.js
   ```

3. **Install frontend dependencies & start React app:**
   ```sh
   cd ../recipe-app
   npm install
   npm run dev
   ```

4. **Open the app in your browser:**  
   ```
   http://localhost:5173
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/recipes` | Get all recipes |
| `GET` | `/api/recipes/:id` | Get recipe details |
| `POST` | `/api/recipes` | Add a new recipe |
| `PUT` | `/api/recipes/:id` | Update a recipe |
| `DELETE` | `/api/recipes/:id` | Delete a recipe |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/users/:email/favorites` | Save recipe to favorites |
| `GET` | `/api/users/:email/favorites` | Get user’s favorite recipes |

## Future Improvements
🔹 More Recipes!

## Author
📌 **Tito Feliciano** – [GitHub Profile](https://github.com/itzxtito)
