import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import "./EventsList.css";

export default function EventsList() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!events) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="linked_categories brand">
        <Link to="category/School" className="inner btn">
          School
        </Link>
        <Link to="category/Work" className="inner btn">
          Work
        </Link>
        <Link to="category/Church" className="inner btn">
          Church
        </Link>
        <Link to="category/Exercise" className="inner btn">
          Exercise
        </Link>
        <Link to="category/Social" className="inner btn">
          Social
        </Link>
        <Link to="category/Other" className="inner btn">
          Other
        </Link>
      </div>
      <div className="recipe-container">
        {events.map((event) => (
          <Link className="recipe-card" to={`${event.id}`} key={event.id}>
            <div className="recipe-content">
              <h5 className="rec-title brand">{event.eventName}</h5>
              <p className="card-info">
                <strong>Due Date:</strong> {event.dueDate}
              </p>
              <p className="card-info">
                <strong>Category:</strong> {event.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <br />
    </>
  );
}
