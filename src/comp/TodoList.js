import React, { useState } from 'react'
import { addBtn, delBtn } from './TodoList2'

export default function TodoList() {
  const [text, setText] = useState('')
  const [list, setList] = useState([])

  function addItem() {
    if (text === '') {
      return
    }
    // console.log('I am tryig to add');
    const newList = [...list]
    newList.push(text)
    setList(newList)
    setText('')
  }
  function deleteAll() {
    setList([])
  }

  return (
    <div>
      Todo:
      <input type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button style={addBtn} onClick={addItem}>ADD</button>
      <button style={delBtn} onClick={deleteAll}>Delete All</button>
      <hr />
      {/* {JSON.stringify(list)} */}

      <ol>
        {list.map((item) => <li>{item}</li>)}
      </ol>

    </div>
  )
}
