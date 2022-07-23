import {makeAutoObservable} from "mobx";
import {sortCards} from "../utils/sortCards";

export interface ITodo {
    id: string | number,
    title: string,
    completed: boolean
    order: number
}

class Todolist {
    todos: ITodo[] = [
        {id: 1, title: 'learn mobx', completed: false, order: 3},
        {id: 2, title: 'go to the cinema', completed: false, order: 1},
        {id: 3, title: 'go for running', completed: true, order: 2},
        {id: 4, title: 'go for running', completed: true, order: 4},
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

    changeStatus(id: string | number) {
        this.todos = this.todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)
    }

    changeArrOfCards(card: ITodo, currentCard: ITodo) {
        this.todos = this.todos.sort(sortCards).map(c => {
                if (c.id === card.id) {
                    return {...c, order: currentCard.order}
                }
                if (c.id === currentCard.id) {
                    return {...c, order: card.order}
                }
                return c
            }
        )
    }
}

export default new Todolist();