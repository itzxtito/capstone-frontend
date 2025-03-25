import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes/featured`);
        setFeaturedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching featured recipes:", error);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div className="container fade-in">
    <div className="home-container">
      <div className="home-hero">
        <h1>🍽️ Welcome to the Potluck!</h1>
        <p>Discover delicious recipes from around the world or share your own!</p>
      </div>

      <section className="featured-section">
        <h2>✨ Featured Recipes</h2>
        <div className="featured-recipes">
          {featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe) => (
              <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="featured-card">
                <img src={`${import.meta.env.VITE_API_URL}${recipe.image}`} alt={recipe.name} />
                <h3>{recipe.name}</h3>
                <p><strong>By:</strong> {recipe.author}</p>
              </Link>
            ))
          ) : (
            <p>No recipes available.</p>
          )}
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home;
