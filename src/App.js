import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [todos, setTodos] = useState('first')

  return (
      <div>
        {todos}
      </div>
  )
}

export default App;
