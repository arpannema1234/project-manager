import errorImg from "../../assets/error.avif";
import classes from "./Error.module.css";
export default function Error() {
  return (
    <main className={classes.main}>
      <img src={errorImg} alt="Error image" />
      <h1>An Error Occured</h1>
    </main>
  );
}
