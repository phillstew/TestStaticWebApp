import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr'

function Counter () {
    var [counter, setCounter] = useState(0);
    let [initalized, setInitialized] = useState(false);

    var baseUrl = "/";
    var route = "todo-service";
    var key = "89c3f81736ec40fba5417fede2df8b54";

    useEffect(() => {
        async function initalize() {
            if(!initalized) {
                var counter = await axios.get(baseUrl + route + `/api/GetCounter?code=${key}`);
                setCounter(counter.data.CurrentCount);
                setInitialized(true);

                var signalRConnection = await axios.get(baseUrl + route + `/api/negotiate?code=${key}`);
                const options = {
                    accessTokenFactory: () => signalRConnection.data.accessToken
                }
                var connection = new HubConnectionBuilder()
                    .withUrl(signalRConnection.data.url, options)
                    .build(HttpTransportType.None);

                connection.on('count', (data) => {
                    setCounter(+data[0]);
                });

                connection.start();
            }

            
        }
        initalize();
    });

    let incrementCount = async () => {
        await axios.get(baseUrl + route + `/api/IncrementCounter?code=${key}`);
    }
    let decrementCount = async () => {
        await axios.get(baseUrl + route + `/api/DecrementCounter?code=${key}`);
    }

    return <div>
        <div>Current Count: { counter }</div>
        <div>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={decrementCount}>Decrement</button>
        </div>
    </div>;
}

export default Counter;
