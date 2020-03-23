import React, { useState } from 'react';

const TodoList = ( {todo} ) => {

    const list = todo.map( data => <div>{data}</div> )

    return (
        <div>
            {list}
        </div>
    )
}

export default TodoList;