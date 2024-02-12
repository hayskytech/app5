import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../App'
import { onValue, push, ref, set } from 'firebase/database'
import { db } from './config'

export default function TodoList() {
  const { user } = useContext(MyContext)
  const [text, setText] = useState('')
  const [list, setList] = useState([])

  const todoRef = ref(db, 'mytodos/' + user.uid)
  function addItem() {
    if (text === '') return
    push(todoRef, text)
    setText('')
  }

  useEffect(() => {
    onValue(todoRef, (snapshot) => {
      const res = snapshot.val()
      if (res) {
        const arr = Object.entries(res)
        setList(arr)
      } else {
        setList([])
      }
    })
  }, [user])

  function deleteItem(id) {
    // const delRef = ref(db, 'mytodos/'+ user.uid + '/' + id)
    const delRef = ref(db, `mytodos/${user.uid}/${id}`)
    set(delRef, null)
  }
  function deleteAll() {
    const delAllRef = ref(db, 'mytodos/' + user.uid)
    set(delAllRef, null)
  }

  return (
    <div>
      <span>Todo:</span>
      <input type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addItem}>ADD</button>
      <button onClick={deleteAll}>Delete All</button>


      <hr />

      <ol>
        {list.map((item) => <li>{item[1]} - <button onClick={() => deleteItem(item[0])}>Delete</button></li>)}
      </ol>
    </div>
  )
}
