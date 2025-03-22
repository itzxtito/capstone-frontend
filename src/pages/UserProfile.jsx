import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const userEmail = "test@example.com"; // Replace with dynamic user email if needed
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const createdRes = await axios.get(`http://localhost:5001/api/recipes?author=${userEmail}`);
        const favoriteRes = await axios.get(`http://localhost:5001/api/users/${userEmail}/favorites`);

        setCreatedRecipes(createdRes.data);
        setFavoriteRecipes(favoriteRes.data);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchRecipes();
  }, [userEmail]);

  const handleDelete = async (recipeId, recipeAuthor) => { // ✅ Ensure author is passed correctly
    console.log(`🛠 Attempting to delete: Recipe ID ${recipeId} by ${recipeAuthor}`);

    try {
      await axios.delete(`http://localhost:5001/api/recipes/${recipeId}`, {
        data: { author: recipeAuthor }, // ✅ Ensure author is sent in request body
      });

      setCreatedRecipes(createdRecipes.filter(recipe => recipe._id !== recipeId));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting recipe:", error.response?.data || error);
      alert("Failed to delete recipe.");
    }
  };

  return (
    <div className="container">
      <h2>My Profile</h2>

      {/* Created Recipes Section */}
      <h3>Created Recipes</h3>
      {createdRecipes.length > 0 ? (
        <div className="recipe-grid">
          {createdRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <Link to={`/recipes/${recipe._id}`}>
                <img src={`http://localhost:5001${recipe.image}`} alt={recipe.name} />
                <h3>{recipe.name}</h3>
              </Link>
              {/* ✅ Corrected Delete Button Implementation */}
              <button onClick={() => handleDelete(recipe._id, recipe.author)} className="delete-btn">
                Delete
              </button>
              <Link to={`/edit-recipe/${recipe._id}`} className="edit-btn">Edit</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't created any recipes yet.</p>
      )}

      {/* Favorite Recipes Section */}
      <h3>Favorite Recipes</h3>
      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-link">
              <div className="recipe-card">
                <img src={`http://localhost:5001${recipe.image}`} alt={recipe.name} />
                <h3>{recipe.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>You haven't saved any favorite recipes yet.</p>
      )}
    </div>
  );
};

export default UserProfile;
