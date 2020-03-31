import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList";
import UseFetch from './UseFetch'
import Header from "./Header";
import Form from './Form'


export const TodoContext = React.createContext();


const TodoStore = () => {

    const [todos, setTodo] = useState(['first']);
    // const [newTodo, setNewtodo] = useState();


    const loading = UseFetch(setTodo, 'http://jsonplaceholder.typicode.com/todos')



    const createTodo = (newTodo) => {
        setTodo([...todos, {'title':newTodo, 'id': todos.length+1, 'completed':true}])
        // console.log(todos.completed)
        // setNewtodo('')

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
          <TodoContext.Provider value={{ todos, createTodo, loading, handleDelete }}>
              <div className="custom">
                  <Header />
                  <Form />
                  <TodoList />
              </div>
          </TodoContext.Provider>
      )
}

export default TodoStore;
