import React, {useContext} from 'react';
import './Line.css'
import {TodoContext} from "./TodoStore";

const Item = ( {todo} ) => {


    const { dispatch } = useContext(TodoContext)
    // const [ dispatch ] = useContext()
    const handleToggle = (e) => {
        const id = e.target.dataset.id;
        dispatch({type:"STATE", payload:id})
    }


    //className을 변수로 뺄수도 있다
    const itemClassName = !todo.completed ? 'line' : null;

    return (
        <li data-id={todo.id}
            onClick={handleToggle}
            className={itemClassName}
        >
            {todo.id} - {todo.title} - {todo.completed}
        </li>
    )
}

export default Item;