import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes`, {
          params: { search: searchTerm, category: category !== "All" ? category : undefined }
        });
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm, category]);

  if (loading) return <h2>Loading recipes...</h2>;

  return (
    <div className="container">
      <h2>Browse Recipes</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Filter Dropdown */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-dropdown">
        <option value="All">All Categories</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Indian">Indian</option>
        <option value="Asian">Asian</option>
      </select>

      {/* Recipe Grid */}
      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-link">
              <div className="recipe-card">
                <img src={recipe.image} alt={recipe.name} />
                <h3>{recipe.name}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
