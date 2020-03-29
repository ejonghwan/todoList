import React, { useState } from 'react';
import Item from './Item'
import './Line.css'

const TodoList = ( {todo, loadings, onToggle} ) => {

    let list = <div>loading...</div>;
    if(!loadings) list = todo.map( data => <Item key={data.id} todo={data} onToggle={onToggle}></Item> )

    return (
        <ul className="ul">
            {list}
        </ul>
    )
}

export default TodoList;