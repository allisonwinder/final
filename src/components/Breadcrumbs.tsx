import { Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Event } from "../Types";
import "./Breadcrumbs.css";

function HomeBreadcrumb() {
  return <div className="text-resize brand">Home</div>;
}

function AddEventBreadcrumb() {
  return (
    <div className="text-resize brand">
      {" "}
      <Link to="/" className="transitions links">
        Home
      </Link>{" "}
      -- Add Event
    </div>
  );
}

function AllRecipesBreadcrumb() {
  return (
    <div className="text-resize brand">
      <Link to="/" className="links">
        Home
      </Link>{" "}
      -- All Events
    </div>
  );
}

function SingleRecipeBreadcrumb() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const location = useLocation();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id, location]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-resize brand">
      <Link to="/" className="links">
        Home
      </Link>{" "}
      --{" "}
      <Link to="/events" className="links">
        All Events
      </Link>{" "}
      -- {event.eventName}
    </div>
  );
}

function CategoryBreadcrumb() {
  const { category } = useParams();
  return (
    <div className="text-resize brand">
      <Link to="/" className="links">
        Home
      </Link>{" "}
      --{" "}
      <Link to="/events" className="links">
        {" "}
        All Events
      </Link>{" "}
      -- {category}
    </div>
  );
}

function SingleCatRecipeBreadcrumb() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const location = useLocation();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id, location]);

  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div className="text-resize brand">
      <Link to="/" className="links">
        Home
      </Link>{" "}
      --{" "}
      <Link to="/events" className="links">
        All Events
      </Link>{" "}
      --{" "}
      <Link to={`/events/category/${event.category}`} className="links">
        {event.category}
      </Link>{" "}
      -- {event.eventName}
    </div>
  );
}

export default function Breadcrumbs() {
  return (
    <div className="crumbs">
      <Routes>
        <Route path="/" element={<HomeBreadcrumb />} />
        <Route path="/addEvent" element={<AddEventBreadcrumb />} />
        <Route path="/events" element={<AllRecipesBreadcrumb />} />
        <Route path="/events/:id" element={<SingleRecipeBreadcrumb />} />
        <Route
          path="/events/category/:category"
          element={<CategoryBreadcrumb />}
        />
        <Route
          path="/events/category/:category/:id"
          element={<SingleCatRecipeBreadcrumb />}
        />
      </Routes>
    </div>
  );
}
