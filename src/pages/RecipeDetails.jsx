import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim()) return;

    try {
      await axios.post(`http://localhost:5001/api/comments/${id}`, {
        username,
        text: newComment,
      });

      setComments([...comments, { username, text: newComment }]);
      setNewComment("");
      setUsername("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!recipe) return <h2>Recipe not found!</h2>;

  return (
    <div className="container">
      <h2>{recipe.name}</h2>
      <p><strong>Posted by:</strong> {recipe.author}</p> {/* ✅ Show author */}
      <img src={`http://localhost:5001${recipe.image}`} alt={recipe.name} className="recipe-image" />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>

      {/* Comment Section */}
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}><strong>{comment.username}:</strong> {comment.text}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default RecipeDetails;
