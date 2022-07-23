import s from './index.module.scss'
import todolist from './../../store/todolist';
import Todolist, {ITodo} from './../../store/todolist';
import {v4} from 'uuid';
import React, {ChangeEvent, useState} from "react";
import {Item} from "../item/Item";
import {observer} from "mobx-react-lite";
import {sortCards} from "../../utils/sortCards";


export const TodoList = observer(() => {

    const [currentCard, setCurrentCard] = useState({} as ITodo)
    const [value, setValue] = useState('')

    const setValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    function addTodoHandler() {
        Todolist.add({title: value, id: v4(), completed: false, order: 5})
        setValue('');
    };

    return (
        <div className={s.todoList}>
            <div className={s.addTodoBlock}>
                <h2><span>add todoList</span>
                    <input type="text" onChange={setValueHandler} value={value}/>
                    <button onClick={addTodoHandler}>add</button>
                </h2>
            </div>
            <div className={s.items}>
                {todolist.todos.map((t, index) => {
                    return (
                        <Item id={t.id} title={t.title}
                              completed={t.completed}
                              currentCard={currentCard}
                              setCurrentCard={setCurrentCard}
                              order={t.order}
                        />
                    )
                })}
            </div>
        </div>
    )
})


export default TodoList;