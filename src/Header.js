import React, { useState, useEffect } from 'react';
import './Header.css'

const Header = ( {todo} ) => {
    return (
        <div className="header">
            list length: {todo.length}
        </div>
    )
}

export default Header