require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Projects = require("./model");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@projectmanager.4tygtnr.mongodb.net/project?retryWrites=true&w=majority&appName=projectManager`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

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
    console.error("Error fetching project titles:", error);
    res.status(500).send("An error occurred while fetching project titles");
  }
});

app.get("/api/project/:projectId", async (req, res) => {
  try {
    const id = req.params.projectId;
    const project = await Projects.findOne({ _id: id });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).send("An error occurred while fetching the project");
  }
});

app.get("/api/all-data", async (req, res) => {
  try {
    const data = await Projects.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching all data:", error);
    res.status(500).send("An error occurred while fetching all data");
  }
});

app.post("/api/add-project", async (req, res) => {
  try {
    await Projects.updateMany({}, { $set: { active: false } });
    const newProject = new Projects(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    console.error("Error adding new project:", error);
    res.status(500).send("An error occurred while adding the new project");
  }
});

app.put("/api/add-task", async (req, res) => {
  const { projectid, value } = req.body;
  try {
    const updatedProject = await Projects.findOneAndUpdate(
      { _id: projectid },
      { $push: { tasks: { body: value } } },
      { new: true }
    );
    res.json(updatedProject.tasks);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send("An error occurred while adding the task");
  }
});

app.delete("/api/delete-project/:projectid", async (req, res) => {
  try {
    const { projectid } = req.params;
    await Projects.deleteOne({ _id: projectid });
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("An error occurred while deleting the project");
  }
});

app.put("/api/clear-task", async (req, res) => {
  const { projectid, taskId } = req.body;
  try {
    const updatedProject = await Projects.findOneAndUpdate(
      { _id: projectid },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );
    res.json(updatedProject.tasks);
  } catch (error) {
    console.error("Error clearing task:", error);
    res.status(500).send("An error occurred while clearing the task");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
