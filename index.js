const express = require("express");
require("dotenv").config();
const { addNote, getNotes, removeNote, updateNotes } = require("./notes.controller.js");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");

const PORT = 3002;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

app.post("/", async (req, res) => {
    try {
        await addNote(req.body.title);
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: true,
            error: false,
        });
    } catch (err) {
        console.log("Ошибка:", err);
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: false,
            error: true,
        });
    }
});

app.delete("/:id", async (req, res) => {
    await removeNote(req.params.id);

    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

app.put("/:id", async (req, res) => {
    try {
        await updateNotes(req.params.id, req.body.title);
        res.json({ success: true });
    } catch (error) {
        console.log("Ошибка обновления записи:", error);
    }
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    app.listen(PORT, () => {
        console.log(chalk.blueBright(`Server has been started on port ${PORT}...`));
    });
});
