import React from 'react'
import './mystyles.css'
export default function MyTable() {
  return (
    <div>
      <h3>Time table</h3>
      <table border="1" id='main_table'>
        <tbody>
          <tr>
            <th>Sl.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Ramesh</td>
            <td>1112223334</td>
            <td>NDK</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Suresh</td>
            <td>1112223334</td>
            <td>KNL</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
