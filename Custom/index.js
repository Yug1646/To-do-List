// CORS => Cross origin resource sharing
// This is the basic server
// Represental state tranfer => curd application and curd api

//C = Create
//R = Read
//U = Update
//D = Delete

const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const PORT = process.env.PORT;

// app.use(cors(""));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

//Write File
app.post("/write", (req, res) => {
  const name = req.body.name;

  fs.writeFile("sample.txt", name, (err) => {
    if (err) {
      return res.status(500).json({
        error: "Couldn't write file",
      });
    }
    res.json({
      message: "File Written Succesfully",
    });
  });
});

app.get("/read", (req, res) => {
  fs.readFile("sample.txt", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Couldn't write file",
      });
    }
    res.json({
      content: data,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
