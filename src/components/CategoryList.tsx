import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import "./EventsList.css";

export default function CategoryList() {
  const { category } = useParams();
  const [events, setEvent] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/events?category=${category}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [category]);

  if (!events) {
    return <LoadingIndicator />; // Render loading state while data is being fetched
  }

  return (
    <>
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
