import logo from "../logo.svg";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="whisk & wander logo" className="imageSize" />
      <div className="centerhead">
        <div className="title">
          <h1 className="brand">To-Do Application</h1>
        </div>
      </div>
    </header>
  );
}
