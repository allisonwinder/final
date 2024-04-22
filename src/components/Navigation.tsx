import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <div className="buttonWrapper brand">
        <Link to="/" className="btn">
          Home
        </Link>
        <Link to="/addEvent" className="btn">
          Add Event
        </Link>
        <Link to="/events" className="btn">
          All Events
        </Link>
      </div>
    </nav>
  );
}
