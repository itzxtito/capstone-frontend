import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const userEmail = "test@example.com"; // Replace with dynamic user email if needed

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      await axios.post(`http://localhost:5001/api/users/${userEmail}/favorites`, {
        recipeId: recipe._id,
      });
      alert("Recipe added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  if (loading) return <h2>Loading recipe...</h2>;
  if (!recipe) return <h2>Recipe not found!</h2>;

  return (
    <div className="container">
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      <button onClick={handleAddToFavorites} className="save-btn">
        Save to Favorites
      </button>
    </div>
  );
};

export default RecipeDetails;
