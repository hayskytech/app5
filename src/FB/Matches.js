import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
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

  function addItem() {
    if (match === '' || teamA === '' || teamB === '' || date === '' || time === '' || place === '') return
    const myRef = ref(db, 'matches')
    push(myRef, { match, teamA, teamB, date, time, place })
    closeBox()
  }

  function getItems() {
    const myRef = ref(db, 'matches')
    onValue(myRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const arr = Object.entries(data)
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
  }
  function closeBox() {
    setMatch('')
    setTeamA('')
    setTeamB('')
    setDate('')
    setTime('')
    setPlace('')
    setBox(false)
  }

  return (
    <div>
      <Button color='green' onClick={() => setBox(true)}>Add</Button>
      <Modal
        open={box}
        onOpen={() => setBox(true)}
        onClose={closeBox}
        closeIcon
        size='mini'
      >
        <Modal.Header>Match Details</Modal.Header>
        <Modal.Content>
          <Form onSubmit={addItem}>
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
            <Button type='submit' color='green'>Submit</Button>
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
                <td>{item[1].time}</td>
                <td>{item[1].place}</td>
                <td>
                  <Button size='mini'>Edit</Button>
                  <Button size='mini' color='red' onClick={() => deleteItem(item[0])}>Delete</Button>
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
