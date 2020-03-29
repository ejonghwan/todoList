import React, {} from 'react';
import './Line.css'

const Item = ( {todo, onToggle} ) => {

    const handleToggle = (e) => {
        const id = e.target.dataset.id
        onToggle(id)
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