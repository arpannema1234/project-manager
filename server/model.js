const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;
// const ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  description: String,
  date: { type: Date, default: Date.now },
  tasks: [{ body: String }],
  active: Boolean,
});

const Projects = mongoose.model("projects", projectSchema);
module.exports = Projects;
//  taskid: { type: ObjectId, default: ObjectId, _id: false }
