
import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

function Home() {

    const [todos,setTodos]  = useState([]);
    const {token,logout} = useAuth();

    useEffect(() => {
        axios.get("http://localhost:3000/get",{
            headers:{
                'Authorization' : `Bearer ${token}` //add token to headers
            }
        })
         .then(result => setTodos(result.data))
         .catch(err => console.log(err));
    },[token]);

    const handleEdit = (id) => {
        axios.put(`http://localhost:3000/update/${id}` , {} , {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
         .then(result => {
            setTodos(prevTodos => 
                prevTodos.map(todo => 
                    todo._id === id? { ...todo , done:true} : todo
                )
            )
         })
         .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}` , {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(result => {
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id)); 
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="home">
            <h2>Todo List</h2>
            <CreateTodo />
            { //displaying the todos
                todos.length === 0
                ?
                <div><h2>No records</h2></div>
                :
                todos.map((todo,index) => (
                    <div className="task" key={index} >
                        <button onClick={handleEdit} className="btn">{todo.done ? "Done" : "Mark as Done"}</button>
                        <p>• {todo.task}</p>
                        <button onClick={() => handleDelete(todo._id)} className="btn">Delete Todo</button>
                    </div>
                    
                ))
            }
        </div>
    )
}

export default Home;
