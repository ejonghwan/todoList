import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList";
import UseFetch from './UseFetch'
import Header from "./Header";


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
        setTodo([...todos, {'title':newTodo, 'id': todos.length+1, 'completed':true}])
        // console.log(todos.completed)

    }

    const handleDelete = (id) => {
        // debugger
        const update = todos.map( data => {
            if(data.id === +id) {
                if(data.completed === true) {
                    data.completed = false
                } else {
                    data.completed = true
                }
            }
            return data
        } )
        console.log(update)
        setTodo(update)
    }



    useEffect( () => {
        console.log('새로운 내용이 랜더링 됐네요.', todos)
    },[todos] )


      return (
          <div className="custom">
              <Header todo={todos}/>
              <form action="">
                <input type="text" onChange={handleTodo}/>
                <button onClick={createTodo}>todo</button>
              </form>
              <TodoList todo={todos} loadings={loading} onToggle={handleDelete}/>
          </div>
      )
}

export default App;
