# 🍲 Potluck App

Welcome to the **Potluck App**, a full-stack recipe-sharing application built with the MERN stack (MongoDB, Express, React, Node.js). Users can browse, post, edit, delete, and save their favorite recipes. This app was developed as a capstone project for the CP 325.9 course.

---

## 🌐 Live Deployment

- **Frontend URL (Netlify)**: [potluck-app.netlify.app]
- **Backend API (Render)**: [https://capstone-backend-zdhp.onrender.com](https://capstone-backend-zdhp.onrender.com)

This site is fully connected to the backend API and supports real-time user authentication, recipe uploads, saving favorites, commenting, and more.

## 🛠 Environment Variables

Make sure your `.env` file includes:

VITE_API_URL=https://capstone-backend-zdhp.onrender.com

---


## 🔧 Technologies Used
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Other Libraries:** Axios, Multer

---

## 👥 User Features
- Sign up and log in securely
- Submit a recipe with image upload
- Edit or delete your own recipes
- Browse all recipes with search & category filter
- View recipe details including ingredients and instructions
- Comment on any recipe
- Save recipes to your favorites
- Profile page with created and favorite recipes

---

## 📂 Project Structure

```
root
├── client/                # React Frontend
│   ├── src/
│   │   ├── pages/         # Main views (Home, Recipes, Details, Profile, etc.)
│   │   ├── components/    # Reusable components (NavBar, Footer)
│   │   ├── styles.css     # Global styles
│   │   └── main.jsx       # Vite entry point
│
├── server/                # Express Backend
│   ├── routes/            # All route files (auth, recipes, users, etc.)
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # Auth middleware
│   └── server.js          # Entry point
```

---

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login existing user

### Recipes
- `GET /api/recipes` - Get all recipes (supports search & filter)
- `GET /api/recipes/featured` - Get 6 random featured recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create recipe (protected)
- `PUT /api/recipes/:id` - Update recipe (protected)
- `DELETE /api/recipes/:id` - Delete recipe (protected)

### Users & Favorites
- `GET /api/users/:username/favorites` - Get user favorites
- `POST /api/users/:username/favorites/:recipeId` - Add favorite
- `DELETE /api/users/:username/favorites/:recipeId` - Remove favorite

### Comments
- `POST /api/comments/:recipeId` - Add comment
- `GET /api/comments/:recipeId` - Get comments for a recipe

---

## 🚑 Development & Deployment
- Local development runs on `localhost:5173` for frontend and `localhost:5001` for backend
- Images are uploaded to `/uploads` folder
- CORS configured for local dev

---

## 🌈 Design & UI Highlights
- Gradient hover effects on cards
- Stylish pill-shaped ingredient tags
- Badge-style comment bubbles
- Avatar animation on profile
- Smooth transitions, scaling, and pop hover effects
- Responsive layout using CSS Grid and Flexbox

---

## 🎓 Developer Notes
- Profile avatars were explored and removed for simplicity
- All data is stored in MongoDB Atlas
- Fully tested via Postman and browser for multiple users

---

## 🔹 Future Improvements
- Dark mode
- User avatars
- Enhanced mobile gestures

---

## © 2025 Potluck App
Made with ❤️ for the CP 325.9 Capstone Project

