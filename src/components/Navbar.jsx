import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Tito's Recipe App</h1>
      <ul style={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recipes"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-recipe"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Add Your Own Recipe
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Sign Up
          </NavLink>
        </li>
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
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "1.5rem",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
};

export default Navbar;
