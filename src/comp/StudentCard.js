import React from 'react'

export default function StudentCard(p) {
  const mystyle = { fontSize: 20, background: 'skyblue' }
  const x = 125
  return (
    <div>
      <h2 style={{ color: 'red' }}>{p.name}</h2>
      <p style={{ fontSize: 20, background: 'skyblue' }}>{p.town}</p>
      <p style={mystyle}>{p.phone}</p>
      <p>{x}</p>
    </div>
  )
}
