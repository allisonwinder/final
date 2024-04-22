import { useParams } from "react-router-dom";
import { Event } from "../Types";
import { useState, useEffect } from "react";
import "./EventView.css";
import LoadingIndicator from "./LoadingIndicator";

export default function EventView() {
  const { id } = useParams();
  const [events, setEvent] = useState<Event>();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!events) {
    return <LoadingIndicator />; // Render loading state while data is being fetched
  }

  return (
    <>
      <div className="single-recipe-card">
        <h1 className="brand recipe-title">{events.eventName}</h1>
        <div className="instructions-card">
          <div className="time">
            <p className="brand prepTime">Due Date: {events.dueDate}</p>
            <p className="brand cookTime">
              Notification Time: {events.notification}
            </p>
          </div>
          <div className="ingredients brand">
            <h3>Description</h3>
            <p>{events.description}</p>
          </div>
          <div className="ingredients brand">
            <h3>Category</h3>
            <p>{events.category}</p>
          </div>
          <div className="instructions brand">
            <h3>Status</h3>
            <p>{events.eventStatus}</p>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
