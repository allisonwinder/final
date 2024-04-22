import React, { useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./AddEvent.css";

export default function AddEvemt() {
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    category: "",
    eventStatus: "",
    dueDate: "",
    description: "",
    notification: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let errors = [];

    if (!newEvent.eventName) {
      errors.push("Please enter both the name of the event.");
    }

    if (!newEvent.category) {
      errors.push("Please select a category.");
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n")); // Join the array elements with a newline character
      return;
    }

    try {
      // Omit the 'id' field when sending the POST request
      const { ...newEventWithoutId } = newEvent;
      await axios.post("http://localhost:3001/events", newEventWithoutId);
      // Clear the form fields
      setNewEvent({
        eventName: "",
        category: "",
        eventStatus: "",
        dueDate: "",
        description: "",
        notification: "",
      });
      setErrorMessage("");
      console.log("Form submitted:", newEvent);
    } catch (error) {
      console.error("Error adding recipe:", error);
      setErrorMessage(
        "An error occurred while adding the recipe. Please try again later."
      );
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setNewEvent((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  /*   const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }; */

  return (
    <>
      <div className="form-container brand">
        <h1 className="add-recipe-title">Add Recipe</h1>
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label htmlFor="eventName">Full Name:</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={newEvent.eventName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Event Description:</label>
            <textarea
              id="description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category" className="brand">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={newEvent.category}
              onChange={handleCategoryChange}
            >
              <option value="" className="brand">
                Select Category
              </option>
              <option value="School" className="brand">
                School
              </option>
              <option value="Work" className="brand">
                Work
              </option>
              <option value="Church" className="brand">
                Church
              </option>
              <option value="Exercise" className="brand">
                Exercise
              </option>
              <option value="Social" className="brand">
                Socials
              </option>
              <option value="Other" className="brand">
                Other
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="eventStatus" className="brand">
              Status:
            </label>
            <select
              id="eventStatus"
              name="eventStatus"
              value={newEvent.eventStatus}
              onChange={handleCategoryChange}
            >
              <option value="" className="brand">
                Select Category
              </option>
              <option value="Complete" className="brand">
                Complete
              </option>
              <option value="In Progress" className="brand">
                In Progress
              </option>
              <option value="Not Started" className="brand">
                Not Started
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="text"
              id="dueDate"
              name="dueDate"
              value={newEvent.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notification">Notification:</label>
            <input
              type="text"
              id="notification"
              name="notification"
              value={newEvent.notification}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="submit-button brand">
            Add Event
          </button>
          {errorMessage && (
            <div className="error-message brand">{errorMessage}</div>
          )}
        </form>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
