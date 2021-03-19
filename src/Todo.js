import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input className="todoItem" type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                <span className="todoText">{todo.name}</span>
            </label>
        </div>
    )
}

