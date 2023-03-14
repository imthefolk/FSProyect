import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    const namefound = persons.map((p)=>p.name)
    console.log(namefound, personObject)
    var nameExist = namefound.find((el)=>{return el === personObject.name})

    if(nameExist)
    {
      var numberExist = persons.map(person => person.number === newNumber)
      
      if (numberExist)
      {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        {
          console.log("newNumber = " + newNumber + " NameExist = " + nameExist)
          var requestPerson = persons.find(n => {if (n.name === newName) return n.id})
        
          personService
          .update(requestPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== requestPerson.id ? person : returnedPerson))
  
          })
        }  
      } 
     
      else alert(newName + ' is already added to phonebook')
    }
    else 
    {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
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

  const deletePerson = (id) => {

    const person = persons.find(p => p.id === id)
    const changedPerson = {...person} 
    if (window.confirm(`Delete ${person.name} ?`)) {
      
      personService
        .erase(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== id ? person : returnedPerson
          ))  

          alert("Delete completed.")

      })
      .catch(error => {
        alert(
          `the note '${person.content}' was already deleted from server`
        )
      setPersons(person.filter(p => p.id !== id))
        }) 
    } 
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
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
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
        }).map(person => 
          <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App