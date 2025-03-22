import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}`);
        setFormData({
          name: response.data.name,
          category: response.data.category,
          ingredients: response.data.ingredients.join(", "),
          instructions: response.data.instructions,
          image: response.data.image,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

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
      await axios.put(`http://localhost:5001/api/recipes/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Recipe updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required />
        <textarea name="instructions" value={formData.instructions} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
