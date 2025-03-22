import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/recipes/featured");
        setFeaturedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching featured recipes:", error);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div className="container">
      <h2>Featured Recipes</h2>
      <div className="recipe-grid">
        {featuredRecipes.length > 0 ? (
          featuredRecipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-link">
              <div className="recipe-card">
                <img src={`http://localhost:5001${recipe.image}`} alt={recipe.name} />
                <h3>{recipe.name}</h3>
                <p><strong>By:</strong> {recipe.author}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
