const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// GET todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json([]);
  }
});

// POST todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;