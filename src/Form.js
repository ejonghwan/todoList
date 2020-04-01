import React, { useContext, useRef } from 'react';
import {TodoContext} from './TodoStore'

const Form = () => {

    const inputRef = useRef(false)
    const { newTodo, createTodo, dispatch } = useContext(TodoContext)
    const divtest = useRef(false)

    const addTodoData = (e) => {
        e.preventDefault()
        // createTodo(inputRef.current.value)
        dispatch({type: "ADD_TODO", payload:inputRef.current.value})
        inputRef.current.value = '';
        divtest.current.innerText = 'haha'

    }
    // console.log(divtest)
    return (
        <div>
            <div ref={divtest}>hahaha</div>
            <form action="">
                <input type="text" ref={inputRef} />
                <button onClick={addTodoData}>todo</button>
            </form>
        </div>
    )
}

export default Form;