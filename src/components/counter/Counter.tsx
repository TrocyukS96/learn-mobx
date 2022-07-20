import s from './index.module.scss';

export const Counter = () => {
    return (
        <div className={s.counter}>
            <button>+</button>
            <span>value</span>
            <button>-</button>
        </div>
    )
}