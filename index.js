const express = require('express')
const app = express();
const cors = require("cors");
const mongoose  = require("mongoose");
const Todomodel = require("./dbModels/Todo");
const UserModel = require("./dbModels/user");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:Srinjoy%40123@cluster0.orud7zo.mongodb.net/todoap_react")

//MiddleWare to verify JWT token >>
const authenticate = (req,res,next) => {
    const token = req.headers['Authorization'];
    if(!token) return res.status(401).json({message:'Acess denied'});

    jwt.verify(token , 'MY_JWT_SECRET' , (err,user) => {
        if (err) return res.status(401).json({message:'Invalid token!'});
        req.user = user; 
        next();
    })
};

app.post('/signup' , async (req,res) => {
    const {username , password} = req.body;
    try {
        const user = new UserModel({username , password});
        await user.save();
        const token = user.generateToken();
    } catch(err) {
        res.status(400).json(err);
    }
});

app.post('/login' , authenticate , async (req,res) => {
    const {username , password} = req.body;
    try {
        const user = await UserModel.findOne({username});
        if (!user || await user.comparePassword(password)){
            return res.status(401).json({message : 'Invalid credentials.'});
        }
        const token = user.generateToken; 
        res.json({token});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.post("/add" , authenticate ,  (req,res) => { //adding todos
    const task = req.body.task;
    const userId = req.user.id; //we are using it to ensure that the tods are associated with the specific authenticated user
    Todomodel.create({
        task : task ,
        user : userId
    }).then(result => res.json(result))
    .catch(err => res.json(err));
})

app.get('/get' , authenticate ,  (req,res) => { //getting the todos
    const userId = req.user.id;
    Todomodel.find({user:userId})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put("/update/:id" , authenticate ,  (req,res) => { //udatinf the todos as mark as done
    const {id} = req.params.id;
    Todomodel.findByIdAndUpdate({_id : id} , {done : true} , {new : true}) //what it does is that it finds the id which we want to mark as completed then we want to update it as done
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete("/delete/:id" , authenticate ,  (req,res) => {
    const {id} = req.params;
    Todomodel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

