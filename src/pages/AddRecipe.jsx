import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({
    name: "",
    category: "",
    ingredients: "",
    instructions: "",
    image: null
  });
  const [error, setError] = useState("");

  // Get the logged-in username and token from localStorage
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setRecipeData({ ...recipeData, image: files[0] });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", recipeData.name);
    formData.append("category", recipeData.category);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("instructions", recipeData.instructions);
    formData.append("image", recipeData.image);
    formData.append("author", username); // Automatically set the author to the logged-in username

    try {
      // Add token to the Authorization header
      const response = await axios.post("http://localhost:5001/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add JWT token here
        },
      });

      alert("Recipe Submitted Successfully");
      navigate("/recipes");
    } catch (err) {
      console.error("Error adding recipe:", err);
      setError("Failed to submit recipe. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="form-container">
    <div className="container">
      <h2>Submit a New Recipe</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Recipe Name" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="text" name="ingredients" placeholder="Ingredients (comma-separated)" onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddRecipe;
