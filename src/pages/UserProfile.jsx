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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>My Profile</h2>

      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>

      {error && <p className="error">{error}</p>}

      <h3>Created Recipes</h3>
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
