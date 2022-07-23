import React, {FC} from "react";
import {v4} from "uuid";
import s from "./index.module.scss";
import {observer} from "mobx-react-lite";
import Todolist, {ITodo} from "../../store/todolist";

interface IProps {
    title: string
    completed: boolean
    id: string | number
    currentCard: ITodo
    setCurrentCard: (card: ITodo) => void
    order: number
}

export const Item: FC<IProps> = observer((
    {
        id, completed, order,
        title, currentCard, setCurrentCard
    }
) => {


    const deleteTodoHandler = (id: string | number) => {
        Todolist.remove(id)
    };
    const changeStatusHandler = (id: string | number) => {
        Todolist.changeStatus(id)
    };

    //handlers for dragEndDrop
    const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: ITodo) => {
        console.log('dragStart -> ' + JSON.stringify(card))
        setCurrentCard(card)
    }

    function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'white'
    }

    function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'white'
    }

    function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault() //нужно дописывать, чтобы все работало нормально
        e.currentTarget.style.background = 'lightGrey'
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>, card: ITodo) {
        e.preventDefault() //нужно дописывать, чтобы все работало нормально
        console.log('drop -> ' + JSON.stringify(card))
        Todolist.changeArrOfCards(card, currentCard)
    }

    return (
        <div
            key={v4()}
            className={s.item}
            draggable={true}
            onDragStart={(e) => onDragStartHandler(e, {completed, title, id, order})}
            //срабатывает в тот момент, когда взяли карточку
            onDragLeave={(e) => onDragLeaveHandler(e)}
            //срабатывает, когда мы вышли за пределы другой карточки
            onDragEnd={(e) => onDragEndHandler(e)}
            //срабатывает, если мы отпустили перемещение
            onDragOver={(e) => onDragOverHandler(e)}
            //срабатывает, если мы находимся над каким-либо другим элементом
            onDrop={(e) => onDropHandler(e, {completed, title, id, order})}
            //срабатывает, если мы отпустили карточку и расчитываем что должно произойти какое-то связанное с этим действие
        >
            <div>{title}</div>
            <input type="checkbox" checked={completed}
                   onChange={() => changeStatusHandler(id)}/>
            <button onClick={() => deleteTodoHandler(id)}>delete</button>
        </div>
    )
})

