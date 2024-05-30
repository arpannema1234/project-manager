import classes from "./sidebar-content.module.css";
import { Link, NavLink } from "react-router-dom";
export default function SidebarContent({ titles, ToggleProjectList }) {
  return (
    <div className={classes.side}>
      <strong>
        <h1 className={classes.head1}>YOUR PROJECTS</h1>
      </strong>
      <div onClick={ToggleProjectList}>
        <Link className={classes.button} to={"/projects/new-project"}>
          + Add new Project
        </Link>
      </div>
      <div className={classes["project-list"]}>
        {titles.map((t) => {
          return (
            <NavLink
              key={t._id}
              className={({ isActive }) =>
                isActive
                  ? classes["project-name"] + " " + classes.active
                  : classes["project-name"]
              }
              to={t._id}
              onClick={ToggleProjectList}
              end
            >
              <span>{t.title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
