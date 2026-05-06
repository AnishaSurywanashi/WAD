const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
    tasks.push(req.body.task);
    res.send("Task added");
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    let id = req.params.id;
    tasks.splice(id, 1);
    res.send("Task deleted");
});
app.put("/tasks/:id", (req, res) => {
    let id = parseInt(req.params.id);

    if (id >= 0 && id < tasks.length) {
        tasks[id] = req.body.task;
        res.send("Task updated");
    } else {
        res.status(404).send("Invalid ID");
    }
});
app.listen(3000, () => console.log("Server running on port 3000"));