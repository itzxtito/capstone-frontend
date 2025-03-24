import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";
import UserProfile from "./pages/UserProfile";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Signup from "./pages/Signup";
import Login from "./pages/Login"; // ✅ Import login page 
import Footer from "./components/Footer";

function AppRoutes() {
  return (
    <div className="app-wrapper">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/signup" element={<Signup />} />  {/* ✅ Added Signup Route */}
        <Route path="/login" element={<Login />} />  ✅ Added Login Route
      </Routes>
      <Footer/>
      
    </Router>
    </div>
  );
}

export default AppRoutes;
