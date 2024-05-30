import { Link } from "react-router-dom";
import image from "../../assets/no-projects.png";
import classes from "./empty-page.module.css";
export default function EmptyPage() {
  return (
    <div className={classes.empty}>
      <img src={image} alt="No project image" />
      <h1>No Project selected</h1>
      <p>Select a project or create a new project</p>
      <Link to="/projects/new-project">
        <button className={classes["button-12"]}>Create New Project</button>
      </Link>
    </div>
  );
}
