import React from 'react'
import './TodoItem.css'

function TodoItem(props) {



    return (
        <div className="todo-item"> 
            <div className="todo-item-text">
                <li>{props.text}</li>
            </div>
            <div className="todo-item-button">
                <button className="complete-btn">
                    <i className="fas fa-check"></i>
                </button>
                <button className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default TodoItem
