import React from 'react'
import StudentCard from './StudentCard'

export default function AllStudents() {
  const title = "List of students"
  const arr = ['apple', 'bat', 'cat']
  const obj = { name: 'mango', price: 25 }
  // console.log(obj.name);
  const data = [
    { name: 'raju', town: "NDK", phone: "8498000172" },
    { name: 'ramesh', town: "KNL", phone: "123465789" },
    { name: 'rani', town: "HYD", phone: "65464564" }
  ]
  // console.log(data[0].name);
  // console.log(data[0]['name']);

  return (
    <div>
      <h1>{title}</h1>
      <pre>{arr}</pre>
      <pre>{JSON.stringify(arr)}</pre>
      <pre>{JSON.stringify(obj)}</pre>

      <StudentCard name="Fixed name" town="fixed town" phone="fixed phone" />

      {data.map((item) =>
        <>
          <StudentCard name={item.name} town={item.town} phone={item.phone} />
        </>
      )}



    </div>
  )
}
