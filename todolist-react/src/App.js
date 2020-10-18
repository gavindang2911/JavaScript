import React, {useState, useEffect} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import { db } from './firebase';

function App() {
  const [items, setItems] = useState([]);

  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection("todos").onSnapshot(snapshot => {
      setItems(snapshot.docs.map(doc => 
        ({
          id:doc.id,
          item: doc.data()
        }),
      ))
    })
  }, [])


  const addItem = (event) => {
    event.preventDefault();
    
    db.collection('todos').add({
      text: input,
      isComplete: false
    });

    setInput('');
  }
 
  return (
    <div className="App">
      <div className="container">
        <div className="header">
              <div className="clear">
                  <i className="fas fa-sync-alt 4x"></i>
              </div>
              <div id="date"></div>
        </div>
        <div className="addToDo">
          <input id="input" placeholder="Add to to " autoComplete="off" value={input} onChange={event => setInput(event.target.value)}/>
          <button className="addButton" type="submit" disabled={!input} onClick={addItem}><i class="fas fa-plus"></i></button>
        </div>

        <div className="content">
          {
            items.map((element, id) => (
              <TodoItem key={id} item={element.item} setItems={setItems} items={items}/>
              
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;
