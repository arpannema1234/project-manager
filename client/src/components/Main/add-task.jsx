import classes from "./add-task.module.css";
export default function Addtask({ addTask }) {
  function submitHandler(event) {
    event.preventDefault();
    addTask(event.target[0].value);
    event.target[0].value = "";
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input type="text" name="task" id="task" />
      <button className={classes["button-2"]}>Add task</button>
    </form>
  );
}
