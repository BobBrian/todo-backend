// This is the Main Server for my Own Stuff.

const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db"); 
const PORT  = process.env.PORT || 5000;


//Middleware
//We make this new Addition to Cors

var corsOptions = {
  origin: "https://perntodo-vq2v.onrender.com", 
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"]
}

app.use(express.json());

//ROUTES//

//create a todo

app.post("/todos", cors(corsOptions), async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query( "INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
      res.header("Access-Control-Allow-Origin", "https://perntodo-vq2v.onrender.com")
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});
  
//get all todos
  
app.get("/todos",cors(corsOptions), async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.header("Access-Control-Allow-Origin", "https://perntodo-vq2v.onrender.com")
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
});
  
  //get a todo
  
  app.get("/todos/:id",cors(corsOptions), async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
      res.header("Access-Control-Allow-Origin", "https://perntodo-vq2v.onrender.com")
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});
  
//update a todo
  
app.put("/todos/:id", cors(corsOptions), async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);
      res.header("Access-Control-Allow-Origin", "https://perntodo-vq2v.onrender.com")
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
});
  
//delete a todo
  
app.delete("/todos/:id", cors(corsOptions), async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
      res.header("Access-Control-Allow-Origin", "https://perntodo-vq2v.onrender.com")
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
});

app.listen(PORT, () => {

 console.log(`Server is starting on port ${PORT}`);

});
