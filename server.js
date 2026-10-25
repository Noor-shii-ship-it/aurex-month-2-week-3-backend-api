
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// Task model
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// Cache MongoDB connection for serverless requests
let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI)
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
}

// Ensure MongoDB is connected before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Week 3 Backend API is running!",
    status: "success",
  });
});

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch tasks error:", error.message);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// GET one task
app.get("/api/tasks/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Get task error:", error.message);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// CREATE task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body || {};

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.create({ title: title.trim() });
    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error.message);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// UPDATE task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const body = req.body || {};
    const updates = {};

    if (Object.hasOwn(body, "title")) {
      if (typeof body.title !== "string" || !body.title.trim()) {
        return res.status(400).json({
          message: "Title must be a non-empty string",
        });
      }

      updates.title = body.title.trim();
    }

    if (Object.hasOwn(body, "completed")) {
      if (typeof body.completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be true or false",
        });
      }

      updates.completed = body.completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide title or completed to update",
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error.message);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// Export Express app for Vercel
module.exports = app;

// Start a local server only when running directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

