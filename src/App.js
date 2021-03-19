import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import randomId from 'react-uuid'

import './style.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(){
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: randomId(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="container">
        <h1 className="title">React Based To Do List</h1>
        <p className="todoText">Insert a To Do Task below</p>
        <input ref={todoNameRef} type = "text" className="todoInput"/>
        <div>
          <button className="todoButton" onClick={handleAddTodo}>Add</button>
          <button className="todoButton" onClick={handleClearTodos}>Clear Completed</button>
        </div>
        <div><h2 className="todoLeft">{todos.filter(todo => !todo.complete).length} items left to do</h2></div>
        <TodoList todos = {todos}  toggleTodo = {toggleTodo}/>
      </div>
    </>
  );
}

export default App;
