import s from './index.module.scss';
import counter from './../../store/counter'
import {observer} from "mobx-react-lite";

// const {count, decrement, increment} = counter
export const Counter = observer(() => {
    return (
        <div className={s.counter}>
            <button onClick={() => counter.increment()}>+</button>
            <span>{counter.count}</span>
            <button onClick={() => counter.decrement()}>-</button>
        </div>
    )
})