import s from './index.module.scss'
import todolist from './../../store/todolist'
class TodoList {
    render(){
        return(
            <div className={s.todoList}>
                <div className={s.items}>
                    {todolist.todos.map((t,index)=>{
                        return(
                            <div>

                            </div>
                        )
                    })}
                </div>
            </div>
            )

    }
}


export default new TodoList()