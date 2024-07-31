import React, { useMemo } from "react";
import { useState } from 'react'
import axios from 'axios';


function CreateTodo() {

    const [task,setTask] = useState();

    const handleAdd = () => {
        axios.post('http://localhost:3000/add' , {task : task ,})
         .then(result => {
            location.reload(); //when we click on add then the todos will show
         })
         .catch(err => console.log(err))
    }

    return (
        <div className="create_form input">
            <input type="text" id="" placeholder="enter task" onChange={(e) => setTask(e.target.value)}></input>
            <button onClick={handleAdd} className="create_form button">Add</button>
        </div>
    )

}

export default CreateTodo;
