import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    instructions: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:5001/api/recipes", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Recipe added successfully!");
      navigate("/recipes");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Recipe Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <textarea name="ingredients" placeholder="Ingredients (comma-separated)" value={formData.ingredients} onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
