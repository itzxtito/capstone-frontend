import { useState } from "react";

const Home = () => {
  // Sample featured recipes
  const [featuredRecipes] = useState([
    { id: 1, name: "Spaghetti Carbonara", image: "https://hipfoodiemom.com/wp-content/uploads/2020/04/IMG_9525-2-500x500.jpg" },
    { id: 2, name: "Chicken Tikka Masala", image: "https://hipfoodiemom.com/wp-content/uploads/2020/04/IMG_9525-2-500x500.jpg" },
    { id: 3, name: "Vegetable Stir Fry", image: "https://hipfoodiemom.com/wp-content/uploads/2020/04/IMG_9525-2-500x500.jpg" },
  ]);

  return (
    <div className="container">
      <h2>Featured Recipes</h2>
      <div className="recipe-grid">
        {featuredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
