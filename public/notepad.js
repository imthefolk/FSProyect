import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  if (props.size)
  {
    return (
      <div>
        <p>
          Hello {props.name}, you are {props.age} years old and s: {props.size}
        </p>
      </div>
    )
  }
  else
  { 
    return(
      <div>
        <p>
          Hello {props.name}, you are {props.age} years old
        </p>
        <button onClick={props.onClick}>
          Login
        </button>
    </div>
    )
  } 
}

const App = () => {
  const name = 'Peter'
  const age = 10
  const size = 10
  console.log("PRINT EN CONSOLAA")
  return (
    <>
      <h1>Greetings</h1> 
      <Hello name="Maya" age={26 + 10} size={size} />
      <Hello name={name} age={age} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))