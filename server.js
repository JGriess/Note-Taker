const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json")
console.log(db)
var app = express();
let idCounter =  0

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes",(req, res) => {
    res.send(db)
})


app.post("/api/notes",(req, res) => {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: idCounter
    }
    console.log(note)
    idCounter++
    db.push(note)
})

app.delete("/api/notes/:id",(req, res) => {
    console.log("test")
})

var PORT = process.env.PORT || 3001;

app.listen(PORT, (err, data) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("connected")
    }

}) 
