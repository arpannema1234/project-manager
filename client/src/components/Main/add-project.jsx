import { Link, useNavigate, useOutletContext } from "react-router-dom";
import classes from "./add-project.module.css";
import axios from "axios";
export default function Addproject() {
  const navigate = useNavigate();
  const { fetchTitles } = useOutletContext();
  function cancelButton() {
    navigate("/projects");
  }
  async function submitHandler(event) {
    try {
      event.preventDefault();
      const project = {
        title: event.target[2].value,
        description: event.target[3].value,
        date: event.target[4].value,
      };
      const newProject = { ...project, tasks: [], active: true };
      const addedProject = await axios.post("/api/add-project", newProject);
      fetchTitles();
      navigate(`/projects/${addedProject.data._id}`);
    } catch (err) {
      console.log("Error in adding Project");
      console.log(err);
    }
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.buttons}>
        <Link to="..">
          <button className={classes.cancel} onClick={cancelButton}>
            Cancel
          </button>
        </Link>
        <button type="submit" className={classes.save + " " + classes.cancel}>
          Save
        </button>
      </div>
      <p>
        <label htmlFor="project-name">TITLE</label>
        <input type="text" name="project-name" id="project-name" />
      </p>
      <p>
        <label htmlFor="project-description">DESCRIPTION</label>
        <textarea id="project-description" />
      </p>
      <p>
        <label htmlFor="due-date">DUE DATE</label>
        <input type="date" name="due-date" id="due-date" />
      </p>
    </form>
  );
}
