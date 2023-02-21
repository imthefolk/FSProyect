import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad, average}) => {
  const sum=bad+neutral+good
  if (sum === 0)
  { 
    return (
    
      <>
        <h1> statistics  </h1>
        <p> No feedback given</p>
      </>) 
  } 


  return (
    <>
      <h1> statistics  </h1>
      <p>good {good}</p> 
      <p>neutral {neutral}</p> 
      <p>bad {bad}</p>  
      <p>all {sum}</p> 
      <p>average {average/sum} </p>  
      <p>positive {(good*100)/sum} %</p>
    </>
  )      
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0) 

  return (
    <div style={{backgroundColor: 'grey'}}>
      <h1> give feedback  </h1>
        <button onClick={()=>{setGood(good+1); setAverage(average+1)}}>good</button> 
        <button onClick={()=> setNeutral(neutral+1)}>neutral</button>
        <button onClick={()=>{setBad(bad+1); setAverage(average-1)}}>bad</button> 

        <Statistics good={good} neutral={neutral} bad={bad} average={average} /> 
    </div>  
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
