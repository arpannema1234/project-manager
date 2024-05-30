require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Projects = require("./model");
const port = process.env.PORT || 8080;
app.use(express.json());

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@projectmanager.4tygtnr.mongodb.net/project?retryWrites=true&w=majority&appName=projectManager`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});

app.get("/api/project-titles", async (req, res) => {
  try {
    const titles = await Projects.find({}, { _id: 1, title: 1 });
    res.json(titles);
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/project/:projectId", async (req, res) => {
  try {
    const id = req.params.projectId;
    const project = await Projects.findOne({ _id: id });
    res.json(project);
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/all-data", async (req, res) => {
  try {
    const data = await Projects.find({});

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/add-project", async (req, res) => {
  async function updateQuery() {
    try {
      const updateActiveQuery = await Projects.updateMany(
        {},
        { $set: { active: false } }
      );
      const insertQuery = new Projects(req.body);
      await insertQuery.save();
      setTimeout(() => {}, 1000);
      return insertQuery;
    } catch (err) {
      console.log(err);
    }
  }
  const insertQuery = updateQuery();
  res.json(insertQuery);
});
app.put("/api/add-task", async (req, res) => {
  const { projectid, value } = req.body;
  const updateTaskQuery = await Projects.findOneAndUpdate(
    { _id: projectid },
    { $push: { tasks: { body: value } } },
    { new: true }
  );
  res.send(updateTaskQuery.tasks);
});
app.delete("/api/delete-project/:projectid", async (req, res) => {
  try {
    const { projectid } = req.params;
    const deleteQuery = await Projects.deleteOne({ _id: projectid });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.put("/api/clear-task", async (req, res) => {
  const { projectid, taskId } = req.body;
  const updateTaskQuery = await Projects.findOneAndUpdate(
    { _id: projectid },
    { $pull: { tasks: { _id: taskId } } },
    { new: true }
  );
  res.json(updateTaskQuery.tasks);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
