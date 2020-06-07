import React from 'react'

const Person = ({ person , deleteHandler}) => {
  return (
    <tr>
      <td>{person.name}</td> 
      <td>{person.number}</td>
      <td>
        <button onClick={deleteHandler(person)}>delete</button>
      </td>
    </tr>
  )
}

const Persons = ({persons, handler}) => {
  if(persons.length === 0)
  {
    return <></>
  }

  return (
  <>
  <table>
      <tbody>    
      {persons.map((person) => 
          <Person key={person.name} person={person} deleteHandler={handler}/>
          )}
      </tbody>
  </table>
  </>
  )
}

export default Persons