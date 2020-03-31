import React, { useContext, useRef } from 'react';
import {TodoContext} from './TodoStore'

const Form = () => {

    const inputRef = useRef(false)
    const { newTodo, createTodo } = useContext(TodoContext)

    const addTodoData = (e) => {
        e.preventDefault()
        // console.log(inputRef.current.checked)
        createTodo(inputRef.current.value)
        inputRef.current.value = '';
    }
    return (
        <div>
            <form action="">
                <input type="text" ref={inputRef} />
                <button onClick={addTodoData}>todo</button>
            </form>
        </div>
    )
}

export default Form;