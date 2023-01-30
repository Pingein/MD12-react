import React, { useRef, useEffect, useState, createElement } from 'react'
import './App.css'


const hasParent = (el:HTMLElement) => {
  return Boolean(el.parentElement)
}


function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let input = inputRef.current?.value
    if (!input) {
      return
    }
    console.log(`'${input}'`)
  }

  const createInput = () => {
    return (
      <form>
        <input type="text" onSubmit={(e) => {
          console.log(e)
        }}/>
        <button className='hidden'>
        </button>
      </form>
    )
  }

  const createTableRow = (task:string) => {
    return (
      <tr className='table-row'>
        <td className='todo__completion'>
          <input type="checkbox" onChange={(e) => {
            if (e.target.checked) {
              console.log('checked')
              if (e.currentTarget.parentElement?.nextElementSibling) {
                e.currentTarget.parentElement.nextElementSibling
                //e.currentTarget.parentElement.style.textDecoration = 'line-through'
              }         
            } else {
              console.log('unchecked')
            }
          }}/>
        </td>
        <td className='todo__task'>
          {task}
        </td>
        <td className='todo__options-container'>
          <button className="edit btn" onClick={(e) => {
            let target = e.currentTarget.parentElement
            console.log(target?.previousElementSibling)
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
        <form className="input__form" onSubmit={(event) => {
          submitHandler(event)
        }}>
          <input ref={inputRef} type="text" className="input__field" placeholder='enter TODO'/>
          <button type='submit' className='input__submit btn'>ADD</button>
        </form>
      </div>
      <div className="todo container">
        <h1>TODO:</h1>

        <table className='todo__list'>
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
            {createTableRow('sleep')}
            {createTableRow('eat')}
            {createTableRow('shart')}
            {createTableRow('repeat')}
            {createInput()}
          </tbody>

        </table>

      </div>
      {/* <div className="info container">
        <p className="info__text">
          {TODOList}
        </p>
      </div> */}
    </div>
  )
}



export default App
