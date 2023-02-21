import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return <Course course={course} />

}

const Course = ({course}) => {

  return (
    <>
      <ul>
        {course.map(course => (<Header key={course.id} course={course} /> ))}
      </ul>
    </>
  )
  
}

const Header = ({course}) => {
  return (
    <>
      <h1> {course.name} </h1>
        <Content parts={course.parts}/>
    </>
  )
}

// export default App

const Content = ({parts}) => {
  
  return (
    <>
      <ul>
          {parts.map(parts => (
            <Part key={parts.id} parts={parts} />
          ))}
      </ul>
      <Total parts={parts} /> 
    </>
  )
}

const Part = ({parts}) => {
  return <li>{parts.name} {parts.exercises}</li>
}

const Total = ({parts}) => { 

  const total = parts.reduce((s, p) => s + p.exercises, 0)

  return(
    <>
      <p>Total of {total} exercises</p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))