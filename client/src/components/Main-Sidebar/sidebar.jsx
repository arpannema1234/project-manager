import { NavLink, Link, useParams, useOutletContext } from "react-router-dom";
import classes from "./sidebar.module.css";
import { useState } from "react";
import SidebarContent from "./sidebar-content";
export default function Sidebar({ titles }) {
  const [toggleProjectList, setToggleProjectList] = useState(false);
  function ToggleProjectList() {
    setToggleProjectList((prev) => !prev);
  }
  let extra = " ";
  if (toggleProjectList) {
    extra += classes.extra;
  }
  return (
    <div className={classes.both}>
      <div className={classes.collapse + extra}>
        <div onClick={ToggleProjectList}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className={"bi bi-list " + classes.listicon}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
        {toggleProjectList && (
          <SidebarContent
            titles={titles}
            ToggleProjectList={ToggleProjectList}
          />
        )}
      </div>
      <div className={classes.side}>
        <strong>
          <h1 className={classes.head1}>YOUR PROJECTS</h1>
        </strong>
        <Link className={classes.button} to={"/projects/new-project"}>
          + Add new Project
        </Link>
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
                end
              >
                <span>{t.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
