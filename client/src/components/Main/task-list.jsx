import classes from "./task-list.module.css";
export default function TaskList({ tasks, deleteIndex }) {
  function deleteFromList(taskid) {
    deleteIndex(taskid);
  }
  if (!tasks || tasks.length === 0) {
    return <h4>No Tasks</h4>;
  }
  return (
    <ul className={classes.list}>
      {tasks.map((t) => (
        <li className={classes.element} key={t._id}>
          <span> {t.body} </span>
          <button
            onClick={() => {
              deleteFromList(t._id);
            }}
          >
            Clear
          </button>
        </li>
      ))}
    </ul>
  );
}
