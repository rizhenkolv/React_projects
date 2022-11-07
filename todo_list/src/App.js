import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [alert, setAlert] = useState({ show: false, msg: '' })
  const [editID, setEditID] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      setAlert({ show: true, msg: 'Please input your data..' })
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName(' ')
    }
    setName(' ')
    console.log(name)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  })

  const removeAlert = () => {
    setAlert({ show: false, msg: '' })
  }

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const editingItem = list.find((item) => item.id === id)
    setEditID(id)
    setIsEditing(true)
    setName(editingItem.title)
  }
  return (
    <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={removeAlert} />}
        <h3>To do List</h3>
        <div className='form-control'>
          <input
            type='text'
            className='todo'
            placeholder='input please your task'
            onChange={(e) => setName(e.target.value)}
          />
          <button className='submit-btn'>Submit</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='todo-container'>
          <List
            items={list}
            list={list}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button className='clear-btn' onClick={(e) => setList([])}>
            Clear list
          </button>
        </div>
      )}
    </section>
  )
}

export default App
