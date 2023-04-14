import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr'

function ToDoList () {
    var [todos, setTodos] = useState([]);
    let [initalized, setInitialized] = useState(false);

    var baseUrl = "/api";
    var route = "/todo-service";
    var key = "89c3f81736ec40fba5417fede2df8b54";

    useEffect(() => {
        async function initalize() {
            if(!initalized) {
                var todos = await axios.get(baseUrl + route + `/todo?code=${key}`);
               setTodos(todos.data);
               setInitialized(true);
            }
        }
        initalize();
    });



    return (
    <div>
        <h3>Todos pulled from cosmosdb:</h3>
        {todos.map((todo) => (
            <div>
                {todo.TodoTask}
            </div>
            ))}
    </div>);
}

export default ToDoList;
