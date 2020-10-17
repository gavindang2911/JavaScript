import React from 'react'
import './TodoItem.css'

function TodoItem(props) {

    const deleteHandler = () => {
        props.setItems(props.items.filter((el) => el.id !== props.item.id))
    };

    const completeHandler = () => {
        
    }

    return (
        <div className="todo-item"> 
            <div className="todo-item-text">
                <li>{props.item.text}</li>
            </div>
            <div className="todo-item-button">
                <button className="complete-btn">
                    <i className="fas fa-check"></i>
                </button>
                <button onClick={deleteHandler} className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default TodoItem
