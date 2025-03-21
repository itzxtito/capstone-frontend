import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Tito's Recipe App</h1>
      <ul style={styles.navLinks}>
      <li><Link to="/">Home</Link></li>
       <li><Link to="/recipes">Recipes</Link></li>
       <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/add-recipe">Add Your Own Recipe</Link></li> {/* New Link */}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#ff6347",
    color: "white",
  },
  logo: { fontSize: "1.5rem" },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;

