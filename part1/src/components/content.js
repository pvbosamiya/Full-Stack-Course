import React from 'react'
import Part, {Total} from './part'

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => 
        <Part key={part.id} part={part} />
      )}
      <Total parts={parts} />
    </>
  )
}

export default Content