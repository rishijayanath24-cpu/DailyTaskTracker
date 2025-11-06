import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));



// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, default: "Medium" },
  dueDate: Date,
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", taskSchema, "tasks");

// Routes

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Daily Task & Productivity Tracker API!");
});

// View All Tasks
app.get("/api/viewAll", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add New Task
app.post("/api/addTask", async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const newTask = new Task({ title, description, priority, dueDate });
    await newTask.save();
    res.json({ status: "Task Added Successfully!" });
  } catch (err) {
    res.json({ status: err.message });
  }
});

// Delete Task by ID
app.post("/api/deleteTask", async (req, res) => {
  const { id } = req.body;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ status: "Task Deleted Successfully!" });
  } catch (err) {
    res.json({ status: "Error deleting task" });
  }
});

// Toggle Task Completion
app.post("/api/toggleTask", async (req, res) => {
  const { id } = req.body;
  const task = await Task.findById(id);
  task.completed = !task.completed;
  await task.save();
  res.json({ status: "Task Updated", completed: task.completed });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
