import React, { useRef, useEffect, useState, createElement } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './App.css'




function App() {
  const [todos, setTodos] = useState<string[]>([])

  const addTask = (task:string) => {
    setTodos([...todos, task])
  }

  const createTableRow = (task:string) => {
    return (
      <tr className='table-row'>
        <td className='todo__completion'>
          <input type="checkbox" onChange={(e) => {
            if (e.currentTarget.parentElement?.nextElementSibling) { 
              let task_element = e.currentTarget.parentElement.nextElementSibling as HTMLTableCellElement
              if (e.target.checked) {
                task_element.style.textDecoration = 'line-through'   
              } else {
                task_element.style.textDecoration = 'none'
              }
            } 
          }}/>
        </td>
        <td className='todo__task'>
          {task}
        </td>
        <td className='todo__options-container'>
          <button className="edit btn" onClick={(e) => {
            if (e.currentTarget.parentElement?.previousElementSibling) {
              let target = e.currentTarget.parentElement.previousElementSibling
              let new_task = prompt('new task name')
              if (new_task) {
                target.innerHTML = new_task
              }
            }
          }}>
            EDIT
          </button>
          <button className="delete btn" onClick={(e) => {
            if (confirm('delete task ?')) {
              e.currentTarget.parentElement?.parentElement?.remove()
            }
          }}>
            DELETE
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="App">
      <div className="input container">
        <form className="input__form" onSubmit={(e) => {
          e.preventDefault()
          let input_element = e.currentTarget.firstElementChild as HTMLInputElement
          let task = input_element.value

          addTask(task)
          input_element.value = ''
        }}>
          <input type="text" className="input__field" placeholder='enter TODO' />
          <button type='submit' className='input__submit btn'>ADD</button>
        </form>
      </div>
      <div className="todo container">
        <h1>TODO:</h1>

        <table id='todo-table' className='todo__list'>
          <thead>
            <tr className='table-row header'>
              <th>||</th>
              <th className="todo__taskname">
                TODO
              </th>
              <th className="todo__options">
                OPTIONS
              </th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => createTableRow(todo))}
          </tbody>
        </table>

      </div>
    </div>
  )
}



export default App
