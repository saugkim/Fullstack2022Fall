import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import services from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    services
      .getAll()
      .then(response => 
        setPersons(response))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange= (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const p = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newName)
    
    if ( found === undefined ) {
      services
        .create(p)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotice(`Added ${newName}`)
          setTimeout(() => {          
            setNotice(null)        
          }, 3000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotice(error.response.data.error)
          setTimeout(() => {
            setNotice(null)
          }, 3000);
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one`)) {
        updatePerson(found)
      }
    }
  }

  const updatePerson = (p) => {  
    const updatedPerson = { ...p, name: newName, number: newNumber }
    console.log(updatedPerson.name, updatedPerson.number, updatedPerson.id)

    services
      .update(p.id, updatedPerson) 
      .then( returned => {
        console.log(updatedPerson)
        setPersons(persons.map(person => person.id !== p.id ? person : updatedPerson))
        console.log('after setPersons')
        setNewName('')
        setNewNumber('')
        setNotice(`${newName}'s phone number updated`)
        setTimeout(() => {          
          setNotice(null)        
        }, 3000)
      })
      .catch(error => { 
        setNotice(error.response.data.error)
        setTimeout(() => {          
          setNotice(null)
        }, 3000)
        //setPersons(persons.filter(person => person.id !== p.id))    
      })
  }

  const removePerson = (childdata) => {
    console.log(childdata)
    if (window.confirm(`Delete ${childdata.name} ?`)) {
      services
        .remove(childdata.id)
        .then(() => {
          services.getAll().then(returned => setPersons(returned))
          setNotice(`${childdata.name} was successfully deleted from server`)
          setTimeout(() => {          
            setNotice(null)        
          }, 3000)
        })
        .catch(error => {
          setNotice(`Information of ${childdata.name} was already deleted from server`)
          setTimeout(() => {          
            setNotice(null)
          }, 3000)
          setPersons(persons.filter(person => person.id !== childdata.id)) 
        }) 
      }
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Notification message={notice} />
      <Filter filter={newFilter} handler={handleFilterChange} />

      <Header text='add a new' />
      <PersonForm name={newName} number={newNumber} namdHandler={handleNameChange} numberHandler={handleNumberChange} addPersonHandler={addPerson} /> 
      {/* <form>
        <Input text='name' name={newName} handler={handleNameChange} />
        <Input text='number' name={newNumber} handler={handleNumberChange} />
        <Button text='add' handler={addPerson} />
      </form> */}

      <Header text='Numbers' />
      <Persons persons={persons} filter={newFilter} handler={removePerson} />
    </div>
  )
}

export default App