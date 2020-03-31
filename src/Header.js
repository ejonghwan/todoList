import React, { useState, useEffect, useContext } from 'react';
import './Header.css'
import {TodoContext} from "./TodoStore";

const Header = () => {

    const { todos } = useContext(TodoContext)

    return (

            <div className="header">
                list length: {todos.filter( n => n.completed === true).length}
            </div>
    )
}

export default Header