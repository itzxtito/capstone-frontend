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
          params: {
            search: searchTerm,
            category: category !== "All" ? category : undefined,
          },
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
    <div className="container fade-in">
    <div className="container">
    <div className="search-section">
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
      <div className="filter-bar">
        <select
          className="category-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="French">French</option>
          <option value="Japanese">Japanese</option>
          <option value="Thai">Thai</option>
          <option value="American">American</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Spanish">Spanish</option>
          <option value="Greek">Greek</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Korean">Korean</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="British">British</option>
          <option value="German">German</option>
          <option value="Russian">Russian</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Brazilian">Brazilian</option>
          <option value="Moroccan">Moroccan</option>
          <option value="Ethiopian">Ethiopian</option>
          <option value="Turkish">Turkish</option>
          <option value="Australian">Australian</option>
          <option value="Dessert">Dessert</option>
          <option value="Vegetarian/Vegan">Vegetarian/Vegan</option>
        </select>
      </div>
    

      {/* Recipe Grid */}
      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link
              to={`/recipes/${recipe._id}`}
              key={recipe._id}
              className="recipe-link">
              <div className="recipe-card">
                <img
                  src={`http://localhost:5001${recipe.image}`}
                  alt={recipe.name}
                />
                <h3>{recipe.name}</h3>
              </div>
            
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default RecipeList;
