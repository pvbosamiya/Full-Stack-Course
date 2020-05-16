import React from 'react'

const Person = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td> 
      <td>{person.number}</td>
    </tr>
  )
}

const Persons = ({persons}) => {
  if(persons.length === 0)
  {
    return <></>
  }

  return (
  <>
  <table>
      <tbody>    
      {persons.map((person) => 
          <Person key={person.name} person={person} />
          )}
      </tbody>
  </table>
  </>
  )
}

export default Persons