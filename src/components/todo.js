import React, { useState } from 'react';

import cross from '../images/icon-cross.svg';

function Todo({ todo, deleteTodo, lightTheme, updateCheckedNum }) {

    const [checked, setChecked] = useState(todo.checked);


    function handleDelete() {
        deleteTodo(todo.id);
    }

    function handleClick(e) {
        todo.checked = !todo.checked;

        setChecked(todo.checked)
        updateCheckedNum();
    }

    return (
        <li className={`main__todo-list__item ${lightTheme ? '' : 'dark'}`}>
            <div className='main__todo-list__checkbox-and-task'>
                <input className='main__todo-list__checkbox-and-task__checkbox' type='checkbox' checked={checked} onChange={handleClick}></input>
                <p className={`main__todo-list__checkbox-and-task__task ${checked ? 'checked' : ''}`} onClick={handleClick}>{todo.text}</p>
            </div>
            <button className='main__todo-list__button' onClick={handleDelete}>
                <img className='main__todo-list__button__cross' src={cross}></img>
            </button>
        </li>
    )
}

export default Todo;