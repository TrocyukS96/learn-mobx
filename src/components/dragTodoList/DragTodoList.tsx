import s from './index.module.scss';

import React, {useState} from "react";
import {sortCards} from "../../utils/sortCards";

export type DragTodo ={
    id:number
    order:number
    text:string
}

export const DragTodoList =()=>{

    const [cardList,setCardList] = useState<DragTodo[]>([
        {id:1, order:3,text:'карточка 3'},
        {id:2, order:1,text:'карточка 1'},
        {id:3, order:2,text:'карточка 2'},
        {id:4, order:4,text:'карточка 4'},
    ])

    const [currentCard, setCurrentCard] = useState({} as DragTodo)

    //handlers for dragEndDrop
    const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: DragTodo) => {
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

    function onDropHandler(e: React.DragEvent<HTMLDivElement>, card: DragTodo) {
        e.preventDefault() //нужно дописывать, чтобы все работало нормально
        console.log('drop -> ' + JSON.stringify(card))
        setCardList(cardList.map(c=>{
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        e.currentTarget.style.background = 'white'
    }

    return(
        <div className={s.todoList}>
            <div className={s.items}>
                {cardList.sort(sortCards).map((card) => {
                    return (
                        <div
                            className={s.item}
                            draggable={true}
                            onDragStart={(e) => onDragStartHandler(e, card)}
                            //срабатывает в тот момент, когда взяли карточку
                            onDragLeave={(e) => onDragLeaveHandler(e)}
                            //срабатывает, когда мы вышли за пределы другой карточки
                            onDragEnd={(e) => onDragEndHandler(e)}
                            //срабатывает, если мы отпустили перемещение
                            onDragOver={(e) => onDragOverHandler(e)}
                            //срабатывает, если мы находимся над каким-либо другим элементом
                            onDrop={(e) => onDropHandler(e, card)}
                            //срабатывает, если мы отпустили карточку и расчитываем что должно произойти какое-то связанное с этим действие
                        >
                            <div>{card.text}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}