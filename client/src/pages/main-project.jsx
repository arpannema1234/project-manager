import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Main-Sidebar/sidebar";
import classes from "./main-project.module.css";
import { Outlet } from "react-router-dom";

export default function MainProject() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);
  const fetchTitles = () => {
    setLoading(true);
    axios
      .get("/api/project-titles")
      .then((response) => {
        setTitles(response.data);
        setFirst(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  if (loading && first) {
    return (
      <div className={classes.spin}>
        <div className={classes.loader}></div>
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <Sidebar titles={titles} fetchTitles={fetchTitles} />
      <div className={classes.project}>
        <Outlet context={{ fetchTitles }} />
      </div>
    </div>
  );
}
