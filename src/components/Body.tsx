import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Body.css";
import Home from "./Home";
import AddEvent from "./AddEvent";
import EventsList from "./EventsList";
import EventView from "./EventView";
import CategoryList from "./CategoryList";

export default function Body() {
  const { pathname } = useLocation();

  return (
    <section>
      <TransitionGroup>
        <CSSTransition
          key={pathname}
          timeout={300}
          classNames="fade"
          unmountOnExit
          appear
        >
          <div className="bodywrapper">
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addEvent" element={<AddEvent />} />
                <Route path="/events" element={<EventsList />} />
                <Route path="/events/:id" element={<EventView />} />
                <Route
                  path="/evebts/category/:category"
                  element={<CategoryList />}
                />
                <Route
                  path="/events/category/:category/:id"
                  element={<EventView />}
                />
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </>{" "}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </section>
  );
}
