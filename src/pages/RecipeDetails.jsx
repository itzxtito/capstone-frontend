import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);

  const [username, setUsername] = useState(localStorage.getItem("username")); // Get the logged-in username from localStorage

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchRecipe();
    fetchComments();
  }, [id]);

  const handleAddToFavorites = async () => {
    const username = localStorage.getItem("username"); // Get the username from localStorage
  
    try {
      await axios.post(`http://localhost:5001/api/users/${username}/favorites`, {
        recipeId: recipe._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      alert("Recipe added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    try {
      const response = await axios.post(`http://localhost:5001/api/comments/${id}`, {
        username: localStorage.getItem("username"),
        text: newComment,
      });
  
      setComments([...comments, response.data]);
      setNewComment("");
      setCommentSuccess(true);
  
      // Hide success message after 2 seconds
      setTimeout(() => setCommentSuccess(false), 2000);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

  if (!recipe) return <h2>Recipe not found!</h2>;

  return (
    
    <div className="container recipe-details">
      <h2>{recipe.name}</h2>
      <p><strong>Posted by:</strong> {recipe.author}</p>
      <img src={`http://localhost:5001${recipe.image}`} alt={recipe.name} className="recipe-image" />
      <section>
      <h3>Ingredients:</h3>
      <ul className="ingredient-list">
  {recipe.ingredients.map((ingredient, index) => (
    <li key={index} className="ingredient-pill">{ingredient}</li>
  ))}
</ul>
</section>

<section>
<h3>Instructions:</h3>
<div className="instructions-block">
  {recipe.instructions}
</div>
</section>

      {/* ✅ Restore "Add to Favorites" button */}
      <div className="center-button">
  <button onClick={handleAddToFavorites} className="save-btn">
    Save to Favorites
  </button>
</div>


      {/* ✅ Comments Section */}
      <section className="comments-section">
      <h3>Comments</h3>
      <div className="comment-badges">
  {comments.length > 0 ? (
    comments.map((comment, index) => (
      <div key={index} className="comment-badge">
        <span className="comment-user">{comment.username}</span>
        <span className="comment-text">“{comment.text}”</span>
      </div>
    ))
  ) : (
    <p>No comments yet. Be the first to comment!</p>
  )}
</div>
</section>


      {/* ✅ Add Comment Form (No "Your Name" field, username is taken from localStorage) */}
      <form onSubmit={handleCommentSubmit}>
  <textarea
    placeholder="Write a comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    required
  />
  <div className="center-button">
    <button type="submit">Post Comment</button>
  </div>
</form>
{commentSuccess && (
  <div className="success-badge">✅ Comment posted!</div>
)}

    </div>
  );
};

export default RecipeDetails;
