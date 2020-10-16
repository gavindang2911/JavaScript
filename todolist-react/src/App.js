import React, {useState, useEffect} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [items, setItems] = useState([
    {
      title: "Work 1",
      isComplete: false
    },
    {
      title: "Work 2",
      isComplete: false
    },
    {
      title: "Work 3",
      isComplete: false
    }
  ])


  return (
    <div className="App">
      <div className="container">
        
        {
          items.map((item, id) => (
            <TodoItem key={id} item={item} />
          ))
        }

      </div>
    </div>
  );
}

export default App;
