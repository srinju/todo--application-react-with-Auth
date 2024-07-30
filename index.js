const express = require('express')
const app = express();
const cors = require("cors");
const mongoose  = require("mongoose");
const Todomodel = require("./dbModels/Todo");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:Srinjoy%40123@cluster0.orud7zo.mongodb.net/todoap_react")

app.post("/add" , (req,res) => { //adding todos
    const task = req.body.task;
    Todomodel.create({
        task : task 
    }).then(result => res.json(result))
    .catch(err => res.json(err));
})

app.get('/get' , (req,res) => { //getting the todos
    Todomodel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put("/update/:id" , (req,res) => { //udatinf the todos as mark as done
    const {id} = req.params;
    Todomodel.findByIdAndUpdate({_id : id} , {done : true}) //what it does is that it finds the id which we want to mark as completed then we want to update it as done
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete("/delete/:id" , (req,res) => {
    const {id} = req.params;
    Todomodel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

