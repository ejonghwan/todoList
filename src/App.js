import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList";

const App = () => {

    const [todos, setTodo] = useState(['first']);
    const [newTodo, setNewtodo] = useState();

    const handleTodo = (e) => {
      setNewtodo(e.target.value)
    }

    const createTodo = (e) => {
        e.preventDefault()
        setNewtodo('')
        setTodo([...todos, newTodo])

    }

      return (
          <div>
              <form action="">
                <input type="text" onChange={handleTodo}/>
                <button onClick={createTodo}>todo</button>
              </form>
              <TodoList todo={todos}/>
          </div>
      )
}

export default App;
