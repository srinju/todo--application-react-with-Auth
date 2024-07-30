
import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import axios from "axios";

function Home() {

    const [todos,setTodos]  = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/get")
         .then(result => setTodos(result.data))
         .catch(err => console.log(err));
    },[])

    const handleEdit = (id) => {
        axios.put("http://localhost:3000/update/"+id)
        .then(result => {
            location.reload();
        })
        .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete("http://localhost:3000/delete/"+id)
        .then(result => {
            location.reload();
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
                        <button onClick={handleEdit} className="btn">Mark as Done</button>
                        <p>• {todo.task}</p>
                        <button onClick={() => handleDelete(todo._id)} className="btn">Delete Todo</button>
                    </div>
                    
                ))
            }
        </div>
    )
}

export default Home;
