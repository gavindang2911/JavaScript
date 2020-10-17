import React, {useState} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [items, setItems] = useState([]);

  const [input, setInput] = useState('');


  const addItem = (event) => {
    event.preventDefault();
    setItems([...items, input]);
    setInput('');
  }
  console.log(items)

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
          <input id="input" placeholder="Add to to " value={input} onChange={event => setInput(event.target.value)}/>
          <button className="addButton" type="submit" disabled={!input} onClick={addItem}><i class="fas fa-plus"></i></button>
        </div>

        <div className="content">
          {
            items.map((item, id) => (
              <TodoItem key={id} text={item} />
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;
