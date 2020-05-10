import React from 'react'
import Content from './content'

const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }

const Course = (props) => {
    const course = props.course
  
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts}/>
      </>
    )
  }

export default Course