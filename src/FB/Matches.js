import React, { useEffect, useState } from 'react'
import { Button, Form, Message, Modal } from 'semantic-ui-react'
import { db } from './config';
import { onValue, push, ref, set } from 'firebase/database';

export default function Matches() {
  const [box, setBox] = useState(false)
  const [match, setMatch] = useState('');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [list, setList] = useState([])
  const [data, setData] = useState(null)
  const [editId, setEditId] = useState(null)
  const [delAllBox, setDelAllBox] = useState(false)
  const [delBox, setDelBox] = useState(false)
  const [error, setError] = useState('')

  function addItem() {
    if (match === '' || teamA === '' || teamB === '' || date === '' || time === '' || place === '') {
      setError('Please enter all fields')
      return
    }
    const myRef = ref(db, 'matches')
    push(myRef, { match, teamA, teamB, date, time, place })
    closeBox()
  }

  function getItems() {
    const myRef = ref(db, 'matches')
    onValue(myRef, (snapshot) => {
      const res = snapshot.val()
      if (res) {
        setData(res)
        const arr = Object.entries(res)
        setList(arr)
      } else {
        setList([])
      }
    })
  }

  useEffect(() => {
    getItems()
  }, [])

  function deleteItem(id) {
    const delRef = ref(db, 'matches/' + id)
    set(delRef, null)
    setDelBox(false)
  }
  function deleteAll() {
    const delAllRef = ref(db, 'matches/')
    set(delAllRef, null)
    setDelAllBox(false)
  }
  function closeBox() {
    setMatch('')
    setTeamA('')
    setTeamB('')
    setDate('')
    setTime('')
    setPlace('')
    setError('')
    setEditId(null)
    setBox(false)
  }
  function editItem(id) {
    setBox(true)
    setEditId(id)
    setMatch(data[id].match)
    setTeamA(data[id].teamA);
    setTeamB(data[id].teamB);
    setDate(data[id].date);
    setTime(data[id].time);
    setPlace(data[id].place);
  }
  function saveItem() {
    const saveRef = ref(db, 'matches/' + editId)
    set(saveRef, { match, teamA, teamB, date, time, place })
    setEditId(null)
    closeBox()
  }
  function showDelBox(id) {
    setEditId(id)
    setMatch(data[id].match)
    setTeamA(data[id].teamA);
    setTeamB(data[id].teamB);
    setDate(data[id].date);
    setTime(data[id].time);
    setPlace(data[id].place);
    setDelBox(true)
  }
  function closeDelBox() {
    setEditId(null)
    setDelBox(false)
  }

  return (
    <div>

      <Button color='green' onClick={() => setBox(true)}>Add</Button>
      {/* display delete button only if list has some values */}
      {list.length > 0 &&
        <Button color='red' onClick={() => setDelAllBox(true)}>Delete All</Button>
      }

      {/* Delete All Confirmation box */}
      <Modal
        size='mini'
        open={delAllBox}
        onOpen={() => setDelAllBox(true)}
        onClose={() => setDelAllBox(false)}
        closeIcon
      >
        <Modal.Header>Delete All?</Modal.Header>
        <Modal.Actions>
          <Button color='red' onClick={deleteAll}>Delete</Button>
          <Button color='black' onClick={() => setDelAllBox(false)}>Cancel</Button>
        </Modal.Actions>
      </Modal>

      {/* Delete one Confirmation box */}
      <Modal
        size='mini'
        open={delBox}
        onOpen={() => setDelBox(true)}
        onClose={() => setDelBox(false)}
        closeIcon
      >
        <Modal.Header>Delete {match}?</Modal.Header>
        <Modal.Content>
          <p>TeamA: {teamA}</p>
          <p>TeamB: {teamB}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Place: {place}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => deleteItem(editId)}>Delete</Button>
          <Button color='black' onClick={closeDelBox}>Cancel</Button>
        </Modal.Actions>
      </Modal>

      {/* Adding box */}
      <Modal
        open={box}
        onOpen={() => setBox(true)}
        onClose={closeBox}
        closeIcon
        size='mini'
      >
        <Modal.Header>
          {editId ? 'Edit match details' : 'Add new match'}
        </Modal.Header>
        <Modal.Content>
          {error !== '' && <Message error header={error} />}
          <Form onSubmit={editId ? saveItem : addItem}>
            <Form.Field>
              <label>Match Name</label>
              <input value={match} onChange={e => setMatch(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Team A</label>
              <input value={teamA} onChange={e => setTeamA(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Team B</label>
              <input value={teamB} onChange={e => setTeamB(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <input type='date' value={date} onChange={e => setDate(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Time</label>
              <input type='time' value={time} onChange={e => setTime(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Place</label>
              <input value={place} onChange={e => setPlace(e.target.value)} />
            </Form.Field>
            <Button type='submit' color='green'>
              {editId ? 'Save Changes' : 'Add'}
            </Button>
            <Button type='button' color='black' onClick={closeBox}>Cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>

      {list.length !== 0 ?
        <table border={1}>
          <thead>
            <tr>
              <th>Match</th>
              <th>Team A</th>
              <th>Team B</th>
              <th>Date</th>
              <th>Time</th>
              <th>Place</th>
              <th>Action</th>
            </tr>
          </thead>
          {list.map((item) =>
            <>
              <tr>
                <td>{item[1].match}</td>
                <td>{item[1].teamA}</td>
                <td>{item[1].teamB}</td>
                <td>{item[1].date}</td>
                <td>{convertTimeFormat(item[1].time)}</td>
                <td>{item[1].place}</td>
                <td>
                  <Button size='mini' color='blue'
                    onClick={() => editItem(item[0])}
                  >Edit</Button>

                  <Button size='mini' color='red'
                    onClick={() => showDelBox(item[0])}
                  >Delete</Button>
                </td>
              </tr>
            </>
          )}
        </table>
        :
        <div>
          No matches found
        </div>
      }



    </div>
  )
}


function convertTimeFormat(inputTime) {
  if (!inputTime) {
    return
  }
  const [hour, minute] = inputTime.split(':');
  const formattedTime = new Date(2022, 1, 1, hour, minute).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return formattedTime;
}