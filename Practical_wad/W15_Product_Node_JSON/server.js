const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static("public"));

// API to get products
app.get("/api/products", (req, res) => {
    fs.readFile("products.json", "utf8", (err, data) => {
        if (err) {
            console.error(err); // 👈 see actual error
            return res.status(500).send("Error reading file");
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});