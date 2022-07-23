import {ITodo} from "../store/todolist";
import {DragTodo} from "../components/dragTodoList/DragTodoList";

export const sortCards = (a:ITodo | DragTodo,b:ITodo | DragTodo)=>{
    if(a.order>b.order){
        return 1
    }else{
        return -1
    }
}