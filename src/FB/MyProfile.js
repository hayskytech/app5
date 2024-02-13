import React from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'

export default function MyProfile() {
  return (
    <Segment inverted color='teal'>
      <h2>My Profile</h2>
      <Form>
        <Form.Group>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' maxLength={30} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' maxLength={30} />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Mobile Number</label>
            <input placeholder='Mobile Number' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input type='email' placeholder='Email' />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit' color='green'>Submit</Button>
      </Form>
    </Segment>
  )
}
