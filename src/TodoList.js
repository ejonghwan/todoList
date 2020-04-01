import React, { useState, useContext } from 'react';
import Item from './Item'
import './Line.css'
import {TodoContext} from "./TodoStore";

const TodoList = () => {

    const { loadings, todos } = useContext(TodoContext)

    let list = <div>loading...</div>;
    if(!loadings) list = todos.map( data => <Item key={data.id} todo={data}></Item> )

    return (
        <ul className="ul">
            {list}
        </ul>
    )
}

export default TodoList;