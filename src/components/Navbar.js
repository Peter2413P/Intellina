import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/events" className="nav-link">Events</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/members" className="nav-link">Members</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>
  );
}
