import React from 'react';
import Counter from './Counter';
import ToDoList from './ToDos';

function Home() {
    return <div>
        This is the home page

        <Counter />
        <hr/>
        <ToDoList />
    </div>;
}

export default Home;
