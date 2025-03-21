import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const { favorites } = useFavorites();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/users/test@example.com/favorites");
        setFavoriteRecipes(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container">
      <h2>My Favorite Recipes</h2>

      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-link">
              <div className="recipe-card">
                <img src={recipe.image} alt={recipe.name} />
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
