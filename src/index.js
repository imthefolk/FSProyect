import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
    ],
  }

  return <Course course={course} />

}

const Course = ({course}) => {

  return (
    <>
      <Header course={course}/>
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
    </>
  )
}

const Part = ({parts}) => {
  return <li>{parts.name} {parts.exercises}</li>
}
// const total = parts.reduce((s, p) => someMagicHere)
// const Total = (props) => {
//   return (
//     <>
//       <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
//     </>
//   )
// }

ReactDOM.render(<App />, document.getElementById('root'))