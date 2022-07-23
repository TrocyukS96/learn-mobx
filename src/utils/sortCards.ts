import {ITodo} from "../store/todolist";

export const sortCards = (a:ITodo,b:ITodo)=>{
    if(a>b){
        return 1
    }else{
        return -1
    }
}