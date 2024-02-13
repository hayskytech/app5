import React from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'

export default function DummyLogin() {

  function handleLoginForm() {
    // do login work
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
      <div style={{ maxWidth: 600, alignSelf: 'stretch', margin: 20 }}>
        <Segment loading={false} inverted color='blue'>
          <h2>Login Form</h2>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit' onClick={handleLoginForm}>Submit</Button>
          </Form>
        </Segment>
      </div>
    </div>
  )
}
