// Creating a model
const mongooose = require("mongoose");

const TodoSchema = new mongooose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

});

const Todo = mongooose.model("Todo",TodoSchema);
module.exports = Todo;
