import React from 'react';
import s from './App.module.scss';
import {Counter} from "../components/counter/Counter";

function App() {
  return (
    <div className={s.app}>
      <h1><span>1.</span>Counter</h1>
        <Counter/>
    </div>
  );
}

export default App;
