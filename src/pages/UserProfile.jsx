import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !username) {
      navigate("/login");
    } else {
      const fetchRecipes = async () => {
        try {
          const createdRes = await axios.get(`http://localhost:5001/api/recipes?author=${username}`);
          const favoriteRes = await axios.get(`http://localhost:5001/api/users/${username}/favorites`);

          setCreatedRecipes(createdRes.data);
          setFavoriteRecipes(favoriteRes.data);
        } catch (error) {
          console.error("Error fetching user recipes:", error);
          setError("Failed to load recipes.");
        }
      };

      fetchRecipes();
    }
  }, [navigate, username]);

  const handleDelete = async (recipeId, recipeAuthor) => {
    console.log(`🛠 Attempting to delete: Recipe ID ${recipeId} by ${recipeAuthor}`);

    try {
      await axios.delete(`http://localhost:5001/api/recipes/${recipeId}`, {
        data: { author: recipeAuthor },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCreatedRecipes(createdRecipes.filter(recipe => recipe._id !== recipeId));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting recipe:", error.response?.data || error);
      alert("Failed to delete recipe.");
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${username}/favorites/${recipeId}`);
      setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe._id !== recipeId));
      alert("Removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove from favorites.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div className="profile-header">
  <img
    src="data:image/jpeg;base64,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"
    alt="Profile Avatar"
    className="profile-avatar"
  />
  <h2>Welcome, {username}!</h2>
</div>


      {error && <p className="error">{error}</p>}

      <h3>🍽️ Created Recipes</h3>
      {createdRecipes.length > 0 ? (
        <div className="recipe-grid">
          {createdRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <Link to={`/recipes/${recipe._id}`}>
                <img src={`http://localhost:5001${recipe.image}`} alt={recipe.name} />
                <h3>{recipe.name}</h3>
              </Link>
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

      <h3>⭐ Favorite Recipes</h3>
      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <Link to={`/recipes/${recipe._id}`} className="recipe-link">
                <img src={`http://localhost:5001${recipe.image}`} alt={recipe.name} />
                <h3>{recipe.name}</h3>
              </Link>
              <button
                onClick={() => handleRemoveFavorite(recipe._id)}
                className="delete-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't saved any favorite recipes yet.</p>
      )}

<div className="logout-container">
  <button onClick={handleLogout} className="logout-button">Logout</button>
</div>

    </div>
    
  );
};

const styles = {
  logoutButton: {
    backgroundColor: "#ff6347",
    border: "none",
    color: "white",
    padding: "10px 15px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};

export default UserProfile;
