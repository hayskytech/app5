import React from 'react'
const pic = require('../images/pic.png')

export default function MyImage() {
  return (
    <div>
      <img
        src="https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg"
        alt=""
        height={300}
        width={400}
      />
      <hr />
      <img src={pic} alt="" height={300} width={400} />
    </div>
  )
}
