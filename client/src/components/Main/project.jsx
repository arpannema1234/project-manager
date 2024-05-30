import Addtask from "./add-task";
import TaskList from "./task-list";
import classes from "./project.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "../UI/delete-icon";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Project() {
  const params = useParams();
  const navigate = useNavigate();
  const projectId = params.projectId;
  const { fetchTitles } = useOutletContext();
  const [project, setProject] = useState(undefined);
  useEffect(() => {
    async function getProject() {
      try {
        setProject(undefined);
        const getLink = `/api/project/${projectId}`;
        const response = await axios.get(getLink);
        setProject(response.data);
      } catch (err) {
        console.log("Error fetching Project");
        console.log(err);
      }
    }
    getProject();
  }, [projectId]);
  async function deleteProject() {
    const response = await axios.delete(`/api/delete-project/${projectId}`);
    fetchTitles();
    navigate("/projects");
  }
  async function deleteIndex(taskId) {
    try {
      const response = await axios.put("/api/clear-task", {
        taskId,
        projectid: projectId,
      });
      setProject((projectData) => {
        return { ...projectData, tasks: response.data };
      });
    } catch (error) {
      console("Error Clearing Tasks");
      console.error(error);
    }
  }
  async function addTasktoProject(x) {
    const addedTask = await axios.put("/api/add-task", {
      projectid: projectId,
      value: x,
    });
    setProject((project) => {
      return { ...project, tasks: addedTask.data };
    });
  }
  const projectDate = project
    ? new Date(project.date).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        weekday: "long",
      })
    : undefined;
  return (
    <div className={classes["project-main"]}>
      <div className={classes.heading}>
        <h1>{(project && project.title) || <Skeleton />}</h1>
        <button onClick={deleteProject}>
          <DeleteIcon />
        </button>
      </div>
      <p className={classes.dateSkeleton}>
        {projectDate || <Skeleton containerClassName={classes.dateSkeleton} />}
      </p>
      <div className={classes.desc}>
        {project ? project.description : <Skeleton count={2} />}
      </div>
      <hr style={{ width: "130%" }} />
      <h2>Tasks</h2>
      <Addtask addTask={addTasktoProject} />
      {project ? (
        <TaskList tasks={project.tasks || []} deleteIndex={deleteIndex} />
      ) : (
        <div className={classes.list}>
          <Skeleton count={3} containerClassName={classes.list} />
        </div>
      )}
    </div>
  );
}
