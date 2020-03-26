import React, { useState } from 'react';

const TodoList = ( {todo, loadings} ) => {

    let list = <div>loading...</div>;
    if(!loadings) list = todo.map( data => <li key={data.id}> {data.id} {data.title} </li> )

    return (
        <ul>
            {list}
        </ul>
    )
}

export default TodoList;