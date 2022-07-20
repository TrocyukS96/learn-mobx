import React from 'react';
import s from './App.module.scss';
import {Counter} from "../components/counter/Counter";
import TodoList from "../components/todoList/TodoList";

function App() {
  return (
    <div className={s.app}>
      <h1><span>1.</span>Counter</h1>
        <Counter/>
        <h1><span>2.</span>Todolist</h1>
      <TodoList />
    </div>
  );
}

export default App;
