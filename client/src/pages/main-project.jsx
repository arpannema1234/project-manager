import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Main-Sidebar/sidebar";
import classes from "./main-project.module.css";
import { Outlet } from "react-router-dom";
import Error from "../components/Error/Error";

export default function MainProject() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);
  const [error, setError] = useState(false);

  function fetchTitles() {
    setLoading(true);
    axios
      .get("/api/project-titles")
      .then((response) => {
        console.log(response);
        setTitles(response.data);
        setFirst(false);
        setLoading(false);
      })
      .catch((err) => {
        // console.log("Error fetching");
        // console.log(err);
        setLoading(false);
        setError(true);
      });
  }
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
  setTimeout(() => {
    if (loading) {
      return <Error />;
    }
  }, 5000);
  if (error) {
    return <Error />;
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
