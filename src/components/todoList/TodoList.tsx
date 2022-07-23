import s from './index.module.scss'
import todolist from './../../store/todolist';
import Todolist, {ITodo} from './../../store/todolist';
import {v4} from 'uuid';
import React, {ChangeEvent, useEffect, useState} from "react";
import {Item} from "../item/Item";
import {observer} from "mobx-react-lite";

export const TodoList = observer(() => {
    const [todoListList, setTodoListList] = useState<ITodo[]>(todolist.todos)

    const [currentCard, setCurrentCard] = useState({} as ITodo)
    const [value, setValue] = useState('')

    useEffect(() => {
        setTodoListList(todolist.todos)
    }, [currentCard])

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
                {todoListList.map((t, index) => {
                    return (
                        <Item card={t}
                              key={index}
                              currentCard={currentCard}
                              setCurrentCard={setCurrentCard}
                        />
                    )
                })}
            </div>
        </div>
    )
})


export default TodoList;