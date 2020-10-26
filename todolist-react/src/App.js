import React, {useState, useEffect} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import { db } from './firebase';
import firebase from 'firebase';

function App() {
  
  const [items, setItems] = useState([]);

  const [input, setInput] = useState('');

  useEffect(() => {
    // db.collection("todos").onSnapshot(snapshot => {
    //   setItems(snapshot.docs.map(doc => 
    //     ({
    //       id:doc.id,
    //       item: doc.data()
    //     }),
    //   ))
    // })
    db.collection("todos").get().then(function(querySnapshot) {
      const newItem = [];
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          newItem.push({
            id:doc.id,
            //...doc.data()    dont need key to assign
            item:doc.data()
          });
      });
      setItems(newItem);
    });
  }, []);

  // console.log(items);

  
  const addItem = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      text: input,
      isComplete: false
    });
    
    db.collection("todos").get().then(function(querySnapshot) {
      const newItem = [];
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          newItem.push({
            id:doc.id,
            //...doc.data()    dont need key to assign
            item:doc.data()
          });
      });
      setItems(newItem);
    });

    // const newTodo = [...items, 
    //   {
    //     item : {
    //       text: input,
    //       isComplete: false
    //     }
    //   }
    // ]
    // setItems(newTodo);
    setInput('');
  }

  const getDate = () => {
    let today = new Date();
    // let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var options = { month: 'long', day: 'numeric' };
    return <h2> {new Date(today).toLocaleDateString([],options)} </h2>;

    // return <h2>{date}</h2>;
  }

  const deleteAll = () => {
    db.collection("todos")
    .get()
    .then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
    });

    setItems([]);
  }



  return (
    <div className="App">
      <div className="container">
        <div className="header">
              <div className="clear">
                  <i className="fas fa-sync-alt fa-lg" onClick={deleteAll}></i>
              </div>
              <div className="title">
                  {getDate()}
              </div>
        </div>
        <div className="addToDo">
          <input id="input" placeholder="Add to to " autoComplete="off" value={input} onChange={event => setInput(event.target.value)}/>
          <button className="addButton" type="submit" disabled={!input} onClick={addItem}><i class="fas fa-plus"></i></button>
        </div>

        <div className="content">
          {
            items.map((element, id) => (
              <TodoItem key={id} itemId={element.id} item={element.item} setItems={setItems} items={items}/>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;
