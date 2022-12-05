import React from 'react';

import Todo from './todo';

function TodoList({ todos, deleteTodo, lightTheme, updateCheckedNum }) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} todo={todo} checked={todo.checked} deleteTodo={deleteTodo} lightTheme={lightTheme} updateCheckedNum={updateCheckedNum} />
        })
    )
}

export default TodoList;