import {makeAutoObservable} from "mobx";

interface ITodo {
    id: string | number,
    title: string,
    completed: boolean
}

class Todolist {
    todos: ITodo[] = [
        {id: 1, title: 'learn mobx', completed: false},
        {id: 2, title: 'go to the cinema', completed: false},
        {id: 3, title: 'go for running', completed: true},
    ]

    constructor() {
        makeAutoObservable(this)
    }

    add(todo: ITodo) {
        this.todos.push(todo)
    }

    remove(id: string | number) {
        this.todos = this.todos.filter(t => t.id !== id)
    }
    changeStatus(id:string | number){
        this.todos = this.todos.map(t=>t.id === id ? {...t,completed:!t.completed} : t)
    }
}

export default new Todolist();