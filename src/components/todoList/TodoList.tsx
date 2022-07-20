import s from './index.module.scss'
import todolist from './../../store/todolist';
import {v4} from 'uuid';
import React, {ChangeEvent} from "react";
import Todolist from './../../store/todolist';


class TodoList extends React.Component<any, any> {

    constructor(prop:any) {
        super(prop);
        this.state = {
            value: '',
        };
    }

    setValueHandler(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ value: e.currentTarget.value });
    }
    addTodoHandler(){
        Todolist.add({title:this.state.value,id:v4(), completed:false})
        this.setState({ value: '' });
    };
    deleteTodoHandler=(id:string | number)=>{
        Todolist.remove(id)
        this.setState({ value: '' });
    };

    changeStatusHandler=(id:string | number)=>{
        Todolist.changeStatus(id)
        this.setState({ value: '' });
    };

    render() {
        return (
            <div className={s.todoList}>
                <div className={s.addTodoBlock}>
                    <h2> <span>add todoList</span>
                        <input type="text" onChange={this.setValueHandler.bind(this)} value={this.state.value}/>
                        <button onClick={this.addTodoHandler.bind(this)}>add</button>
                    </h2>
                </div>
                <div className={s.items}>
                    {todolist.todos.map((t) => {
                        return (
                            <div key={v4()} className={s.item}>
                                <div>{t.title}</div>
                                <input type="checkbox" checked={t.completed} onChange={()=>this.changeStatusHandler(t.id)}/>
                                <button onClick={()=>this.deleteTodoHandler(t.id)}>delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }
}


export default TodoList;