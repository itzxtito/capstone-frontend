import { createContext, useState, useContext } from "react";

// Create context
const FavoritesContext = createContext();

// Custom hook to use context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// Favorites provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // 🔹 Store all recipes in context
  const [recipes] = useState([
    { id: "1", name: "Spaghetti Carbonara", category: "Italian", image: "https://source.unsplash.com/200x150/?pasta" },
    { id: "2", name: "Chicken Tikka Masala", category: "Indian", image: "https://source.unsplash.com/200x150/?chicken" },
    { id: "3", name: "Vegetable Stir Fry", category: "Asian", image: "https://source.unsplash.com/200x150/?vegetables" },
    { id: "4", name: "Beef Tacos", category: "Mexican", image: "https://source.unsplash.com/200x150/?tacos" },
  ]);

  // Function to add a recipe to favorites
  const addToFavorites = (recipe) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === recipe.id)) {
        return [...prevFavorites, recipe];
      }
      return prevFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, recipes }}>
      {children}
    </FavoritesContext.Provider>
  );
};
