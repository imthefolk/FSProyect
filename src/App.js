import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    const namefound = persons.map((p)=>p.name)
    console.log(namefound, personObject)
    var isExist = namefound.find((el)=>{return el === personObject.name})

    if(isExist)
    {
      alert(newName + ' is already added to phonebook')
    }
    else 
    {
      setPersons(persons.concat(personObject))
    }  

    setNewName('')
  } 

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input value={newFilter} onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter((val)=> {
          if (newFilter === "")
          {
            return val
          }
          else if (val.name.toLowerCase().includes(newFilter.toLowerCase()))
          {
            return val
          }   
        }).map(persons => 
          <Person key={persons.id} person={persons} />
        )}
      </ul>
    </div>
  )
}

export default App