import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList";
import UseFetch from './UseFetch'


const App = () => {

    const [todos, setTodo] = useState(['first']);
    const [newTodo, setNewtodo] = useState();


    const loading = UseFetch(setTodo, 'http://jsonplaceholder.typicode.com/todos')


    const handleTodo = (e) => {
      setNewtodo(e.target.value)
    }

    const createTodo = (e) => {
        e.preventDefault()
        setNewtodo('')
        setTodo([...todos, {title:newTodo, id: todos.length+1}])

    }



    useEffect( () => {
        console.log('effect')
    },[todos] )


      return (
          <div>
              <form action="">
                <input type="text" onChange={handleTodo}/>
                <button onClick={createTodo}>todo</button>
              </form>
              <TodoList todo={todos} loadings={loading}/>
          </div>
      )
}

export default App;
