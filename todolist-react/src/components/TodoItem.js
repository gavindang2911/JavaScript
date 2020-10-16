import React from 'react'
import './TodoItem.css'

function TodoItem(props) {
    return (
        <div className="todo-item"> 
            <li className="item">{props.item.title}</li>
            <button className="complete-btn">
                <i className="fas fa-check"></i>
            </button>
            <button className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

export default TodoItem
