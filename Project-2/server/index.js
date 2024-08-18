const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const mongooose = require("mongoose");
const todoModel = require("./models/Todo");

dotenv.config();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

// Database connection
mongooose
  .connect(MONGO_URL)

  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error connecting to database : ", error));

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Create Request Todo (POST)
// Every api u create is always async

app.post("/create", async (req, res) => {
  //Grab data from frontend

  const getTitle = req.body.title;
  const getDescription = req.body.description;

  const todo = new todoModel({
    title: getTitle,
    description: getDescription,
  });

  try {
    await todo.save();
    res.send("Todo Created Successfully");
  } catch (error) {
    console.log("Error : ", error);
  }
});

// Get Todo

app.get("/get", async (req, res) => {
  // {} use karne se sara data aayega, particular chahiye to  use $where

  todoModel
    .find({})
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await todoModel.findByIdAndDelete(id).exec();
  res.send("Todo Deleted");
});

app.put("/update/:id", async (req, res) => {
  const { newTitle, newDescription } = req.body;
  const id = req.params.id;
  try {
    const todo = await todoModel.findById(id);
    if (!todo) {
      return res.status(404).send("Todo Not Found");
    }
    todo.title = newTitle;
    todo.description = newDescription;
    await todo.save();
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status().send("Internal Server Error");
  }
});
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
