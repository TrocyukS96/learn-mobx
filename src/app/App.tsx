import React from 'react';
import s from './App.module.scss';
import {Counter} from "../components/counter/Counter";
import TodoList from "../components/todoList/TodoList";
import {DragTodoList} from "../components/dragTodoList/DragTodoList";
import {TasksDesk} from "../components/tasksDesk/tasksDesk";

function App() {
    return (
        <div className={s.app}>
            <h1><span>1.</span>Counter</h1>
            <Counter/>
            <h1><span>2.</span>Todolist</h1>
            <TodoList/>
            <h1><span>3.</span>Training how to do drag&drop without mobX</h1>
            <DragTodoList/>
            <h1><span>4.</span>Tasks desk</h1>
            <TasksDesk/>

        </div>
    );
}

export default App;
