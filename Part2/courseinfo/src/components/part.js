import React from 'react'

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

export const Total = ({parts}) => {
  const reducerSum = (accumulator, part) => {
    return (accumulator + part.exercises)
  }
  return (
    <p><b>total of {parts.reduce(reducerSum, 0)} exercises</b></p>
  )
}

export default Part