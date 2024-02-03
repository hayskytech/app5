import React, { useState } from 'react'

export default function TodoList2() {
  let oldList = []
  if (localStorage.getItem('myTodos')) {
    oldList = JSON.parse(localStorage.getItem('myTodos'))
  }
  const [text, setText] = useState('')
  const [list, setList] = useState(oldList)

  function addItem() {
    if (text === '') return
    const newList = [...list]
    newList.push(text)
    setList(newList)
    localStorage.setItem('myTodos', JSON.stringify(newList))
    setText('')
  }

  function deleteAll() {
    setList([])
    localStorage.setItem('myTodos', JSON.stringify([]))
  }

  return (
    <div>
      <span style={todoStlye}>Todo:</span>
      <input type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button style={addBtn} onClick={addItem}>ADD</button>
      <button style={delBtn} onClick={deleteAll}>Delete All</button>

      <hr />

      <ol>
        {list.map((item) => <li>{item}</li>)}
      </ol>

    </div>
  )
}


export const delBtn = { background: 'red', color: 'white', padding: 5, margin: 2 }
export const addBtn = { background: 'green', color: 'white', padding: 5, margin: 2 }
export const todoStlye = { fontSize: 20, fontWeight: 'bold', padding: 5 }

// we will use this type later
export const stlyes = {
  delBtn: { background: 'red', color: 'white', padding: 5, margin: 2 },
  addBtn: { background: 'green', color: 'white', padding: 5, margin: 2 },
  todoStlye: { fontSize: 20, fontWeight: 'bold', padding: 5 }
}