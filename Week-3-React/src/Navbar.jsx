
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        My React Project
      </Link>

      <div className="navbar-nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/posts">
          Posts
        </Link>
        <Link className="nav-link" to="/expenses">
          Expense Tracker
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
