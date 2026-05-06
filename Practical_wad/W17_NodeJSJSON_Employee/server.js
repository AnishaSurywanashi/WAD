const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static("public"));

// API to get employees
app.get("/api/employees", (req, res) => {
    const filePath = path.join(__dirname, "employees.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "File read error" });
        }

        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.status(500).json({ error: "Invalid JSON" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});