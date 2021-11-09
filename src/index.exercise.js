import * as React from 'react'
import ReactDOM from 'react-dom'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

import {Logo} from './components/logo'

function App() {
  const [openModal, setOpenModal] = React.useState('none')
  const open = modal => setOpenModal(modal)
  const close = () => setOpenModal('none')
  const login = formData => {
    console.log('login', formData)
    close()
  }
  const register = formData => {
    console.log('register', formData)
    close()
  }

  return (
    <div>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={() => open('login')}>Login</button>
      <button onClick={() => open('register')}>Register</button>

      <Dialog
        style={{color: 'blue'}}
        isOpen={openModal === 'login'}
        onDismiss={close}
      >
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog
        style={{color: 'green'}}
        isOpen={openModal === 'register'}
        onDismiss={close}
      >
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  )
}

function LoginForm({onSubmit, buttonText}) {
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
