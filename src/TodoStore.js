import React, { useState, useEffect, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList";
import UseFetch from './UseFetch'
import Header from "./Header";
import Form from './Form'


export const TodoContext = React.createContext();

const todoReduser = (todos, {type, payload}) => {
    switch (type) {
        case "ADD_TODO":
            return ;
        case "SET_INIT_DATA":
            return payload;
    }
}

const TodoStore = () => {

    // const [todos, setTodo] = useState(['first']);
    // const [newTodo, setNewtodo] = useState();
    const [todos, dispatch ] = useReducer(todoReduser, []);

    const setInitData = (initData) => {
        dispatch({type:"SET_INIT_DATA", payload:initData})
    }

    const loading = UseFetch(setInitData, 'http://jsonplaceholder.typicode.com/todos')


    const createTodo = (newTodo) => {
        // setTodo([...todos, {'title':newTodo, 'id': todos.length+1, 'completed':true}])
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
        // setTodo(update)
    }



    useEffect( () => {
        console.log('새로운 내용이 랜더링 됐네요.', todos)
    },[todos] )


      return (
          <TodoContext.Provider value={{todos, createTodo, loading, handleDelete }}>
              <div className="custom">
                  <Header />
                  <Form />
                  <TodoList />
              </div>
          </TodoContext.Provider>
      )
}

export default TodoStore;
