import React, { useEffect, useState } from 'react'

export default function TodosEditable() {
  let oldList = []
  if (localStorage.getItem('myTodos')) {
    oldList = JSON.parse(localStorage.getItem('myTodos'))
  }
  const [text, setText] = useState('')
  const [list, setList] = useState(oldList)

  const [editText, setEditText] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(list))
  }, [list])

  function addItem(e) {
    e.preventDefault()
    let newList = [...list]
    newList.push(text)
    setList(newList)
    setText('')
  }
  function deleteItem(index) {
    let newList = [...list]
    newList.splice(index, 1);
    setList(newList)
  }

  function deleteAll() {
    setList([])
  }

  function editItem(index) {
    setEditText(list[index])
    setEditId(index)
    const box = document.getElementById('edit')
    box.showModal()
  }

  function saveItem() {
    let newList = [...list]
    newList[editId] = editText
    setList(newList)
    closeBox()
  }
  function closeBox() {
    const box = document.getElementById('edit')
    box.close()
  }


  return (
    <div>
      <dialog id='edit'>
        <div>
          <input type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
        </div>
        <button onClick={saveItem}>Save</button>
        <button onClick={closeBox}>Close</button>
      </dialog>

      <form onSubmit={addItem}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button>ADD</button>
        <button onClick={deleteAll} type='button'>Delete All</button>
      </form>
      <table>
        {list.map((item, index) =>
          <tr key={index}>
            <td>{index + 1}.</td>
            <td>{item}</td>
            <td>
              <button onClick={() => editItem(index)}>Edit</button>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </td>
          </tr>
        )}
      </table>
    </div>
  )
}
