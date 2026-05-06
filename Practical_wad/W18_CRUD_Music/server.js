const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Song = require("./models/Song");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

/* DB CONNECTION */
mongoose.connect("mongodb://127.0.0.1:27017/music")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


/* INSERT 5 SONGS */
app.get("/insert", async (req, res) => {
    await Song.insertMany([
        { songname: "Tum Hi Ho", film: "Aashiqui 2", music_director: "Mithoon", singer: "Arijit Singh" },
        { songname: "Kal Ho Na Ho", film: "KHNH", music_director: "Shankar", singer: "Sonu Nigam" },
        { songname: "Chaiyya Chaiyya", film: "Dil Se", music_director: "AR Rahman", singer: "Sukhwinder" },
        { songname: "Kesariya", film: "Brahmastra", music_director: "Pritam", singer: "Arijit Singh" },
        { songname: "Tujh Mein Rab Dikhta", film: "RNBDJ", music_director: "Salim", singer: "Roop Kumar" }
    ]);
    res.send("5 Songs Inserted");
});

/* DISPLAY ALL + COUNT */
app.get("/songs", async (req, res) => {
    const songs = await Song.find();
    res.json({ count: songs.length, songs });
});

/* MUSIC DIRECTOR SONGS */
app.get("/director/:name", async (req, res) => {
    const songs = await Song.find({ music_director: req.params.name });
    res.json(songs);
});

/* DIRECTOR + SINGER */
app.get("/director/:director/singer/:singer", async (req, res) => {
    const songs = await Song.find({
        music_director: req.params.director,
        singer: req.params.singer
    });
    res.json(songs);
});

/* DELETE SONG */
app.get("/delete/:name", async (req, res) => {
    await Song.deleteOne({ songname: req.params.name });
    res.send("Song Deleted");
});

/* ADD NEW SONG */
app.post("/add", async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.send("Song Added");
});

/* SINGER + FILM */
app.get("/search", async (req, res) => {
    const { singer, film } = req.query;
    const songs = await Song.find({ singer, film });
    res.json(songs);
});

/* UPDATE ACTOR & ACTRESS */
app.get("/update/:name", async (req, res) => {
    await Song.updateOne(
        { songname: req.params.name },
        { actor: "Ranbir Kapoor", actress: "Alia Bhatt" }
    );
    res.send("Updated");
});
app.listen(3000, () => console.log("Server running on port 3000"));