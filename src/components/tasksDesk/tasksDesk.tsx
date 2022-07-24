import s from './index.module.scss';
import React, {useState} from "react";
import {ITodo} from "../../store/todolist";

type TasksDeskType = {
    id: number
    title: string
    tasks: BoardTaskType[]
}

type BoardTaskType = {
    id: number
    title: string
}

export const TasksDesk = () => {
    const [boards, setBoards] = useState<TasksDeskType[]>([
        {
            id: 1,
            title: 'Сделать',
            tasks: [{id: 1, title: 'сходить в магаз'}, {id: 2, title: 'пойти на пробежку'}, {
                id: 3,
                title: 'встретиться с другом'
            },]
        },
        {id: 2, title: 'Проверить', tasks: [{id: 4, title: 'Убраться в доме'}]},
        {id: 3, title: 'Сделано', tasks: [{id: 5, title: 'Поесть'}]},
    ])
    const [currentBoard, setCurrentBoard] = useState({} as TasksDeskType)
    const [currentItem, setCurrentItem] = useState({} as BoardTaskType)

    //handlers for dragEndDrop
    const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: TasksDeskType, item: BoardTaskType) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'antiquewhite'
        e.currentTarget.style.boxShadow = 'none'

    }

    function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'antiquewhite'
        e.currentTarget.style.boxShadow = 'none'
    }

    function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault() //нужно дописывать, чтобы все работало нормально
        e.currentTarget.style.background = 'lightGrey'
        if (e.currentTarget.className === s.item) {
            e.currentTarget.style.boxShadow = '0 2px 3px gray'
        }
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>, board: TasksDeskType, item: BoardTaskType) {
        e.preventDefault() //нужно дописывать, чтобы все работало нормально
        e.currentTarget.style.background = 'antiquewhite'

        //получаем индекс карточки в массиве, которую мы держим в руке
        const currentIndex = currentBoard.tasks.indexOf(currentItem)

        //поскольку мы перетаскиваем задачу из текущей доски, то нам нужно удалить из текущей доски
        currentBoard.tasks.splice(currentIndex, 1)

        //получаем индекс карточки в массиве, над которым мы держим текущую карточку
        const dropIndex = board.tasks.indexOf(currentItem)

        // добавляем в доску, над которой мы держим карточу  - эту карточку
        board.tasks.splice(dropIndex + 1, 0, currentItem)

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))

    }

    function onDragCardOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault() //нужно дописывать, чтобы все работало нормально
        if (e.currentTarget.className === s.item) {
            e.currentTarget.style.boxShadow = '0 2px 3px gray'
        }
    }

    const onDropCardHandler = (e: React.DragEvent<HTMLDivElement>, desk: TasksDeskType) => {
        desk.tasks.push(currentItem)

        //получаем индекс карточки в массиве, которую мы держим в руке
        const currentIndex = currentBoard.tasks.indexOf(currentItem)

        //поскольку мы перетаскиваем задачу из текущей доски, то нам нужно удалить из текущей доски
        currentBoard.tasks.splice(currentIndex, 1)

        //делаем замену состояния, чтобы страница перерисовывалась
        setBoards(boards.map(b => {
            if (b.id === desk.id) {
                return desk
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    return (
        <div className={s.cardDesk}>
            <div className={s.items}>
                {boards.map((desk, index) => {
                    return (
                        <div
                            className={s.item}
                            onDragOver={(e) => onDragCardOverHandler(e)}
                            onDrop={(e) => onDropCardHandler(e, desk)}

                        >
                            <h3>{desk.title}</h3>
                            <div className={s.tasks}>
                                {desk.tasks.map((task, index) => {
                                    return (
                                        <div
                                            draggable={true}
                                            onDragStart={(e) => onDragStartHandler(e, desk, task)}
                                            //срабатывает в тот момент, когда взяли карточку
                                            onDragLeave={(e) => onDragLeaveHandler(e)}
                                            //срабатывает, когда мы вышли за пределы другой карточки
                                            onDragEnd={(e) => onDragEndHandler(e)}
                                            //срабатывает, если мы отпустили перемещение
                                            onDragOver={(e) => onDragOverHandler(e)}
                                            //срабатывает, если мы находимся над каким-либо другим элементом
                                            onDrop={(e) => onDropHandler(e, desk, task)}
                                            //срабатывает, если мы отпустили карточку и расчитываем что должно произойти какое-то связанное с этим действие
                                            key={index}
                                            className={s.task}>
                                            {task.title}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
