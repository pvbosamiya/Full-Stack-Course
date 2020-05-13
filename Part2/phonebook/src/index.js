import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

const phonebook = [
  {
    name: 'Arto Hellas',
    number: '040-1234567'
  }
]

ReactDOM.render(
  <App phonebook={phonebook}/>,
  document.getElementById('root')
)