import React from 'react'
import './TodoItem.css'
import { db } from '../firebase';

function TodoItem(props) {

    const deleteHandler = () => {
        // props.setItems(props.items.filter((el) => el.id !== props.item.id))

        db.collection("todos").doc(props.itemId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    };

    const completeHandler = () => {
        props.setItems(props.items.map(el => {
            if (el.id === props.item.id) {
                return {
                    ...el, isComplete:!el.isComplete
                }
            }
            return el;
        }))
    }

    return (
        <div className="todo-item"> 
            <div className={`todo-item-text 
                ${props.item.isComplete ? "todo-item-complete" : ""}`}>
                <li>{props.item.text}</li>
            </div>
            <div className="todo-item-button">
                <button onClick={completeHandler} className="complete-btn">
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
