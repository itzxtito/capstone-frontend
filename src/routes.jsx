import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";
import UserProfile from "./pages/UserProfile";
import AddRecipe from "./pages/AddRecipe";

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
  <Route path="/recipes" element={<RecipeList />} />
  <Route path="/recipes/:id" element={<RecipeDetails />} />
  <Route path="/profile" element={<UserProfile />} />
  <Route path="/add-recipe" element={<AddRecipe />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;


