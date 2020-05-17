import React, {useState, useEffect} from 'react'
import Filter from './filter'
import Persons from './persons'
import personService from '../services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setnewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [search, setSearch] = useState('')
    const [useSearch, setUseSearch] = useState(false)

    const findPersonFunc = (person) => {
        let name = (person.name).toLowerCase()
        if (name.includes(search.toLowerCase()))
        {
            return true
        }

        return false
    }

    const personsToShow = useSearch ? persons.filter(findPersonFunc) : persons

    const hook = () => {
        personService.get().then(initialData => setPersons(initialData))
    }

    const deleteHandler = (id) => {
        const handler = () => {
            personService.remove(id)
            personService.get().then(updatedData => setPersons(updatedData))
        }

        return handler
    }

    useEffect(hook, [newName])

    const handleSearch = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
        setUseSearch(true)
    }

    const checkPresence = (person) => person.name === newName

    const addnewPerson = (event) => {
        event.preventDefault()
        if (newName.length !== 0 && newNumber.length !== 0)
        {
            let searchIndex = persons.findIndex(checkPresence)
            console.log("Found ", newName, " at index ", searchIndex)
            if (searchIndex !== -1)
            {
                if(persons[searchIndex].number !== newNumber)
                {
                    const update = window.confirm(newName + 
                        ' is part of the Phonebook, Do you want to update the phone number?')
                    if(update === true)
                    {
                        const newPerson = {
                            name: newName,
                            number: newNumber
                        }
                        personService.update(persons[searchIndex].id, newPerson).then
                            (setPersons(updatedPersons => setPersons(updatedPersons)))
                    }
                }
            }
            else
            {
                const newPerson = { 
                    name: newName,
                    number: newNumber
                }

                personService.create(newPerson).then(newPersonR => 
                    setPersons(persons.concat(newPersonR)))
            }

            setnewName('')
            setNewNumber('')
        }
    }

    const handlenewName = (event) => {
        console.log(event.target.value)
        setnewName(event.target.value)
    }

    const handlenewNumber = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
    <div>

        <Filter changeHandler={handleSearch} defaultSearch={search}/>
        <h2>Add</h2>
        <form onSubmit={addnewPerson}>
        <table>
            <tbody>
                <tr>
                    <td>name:</td>
                    <td><input value={newName}
                         onChange={handlenewName}/></td>
                </tr>
                <tr>
                    <td>number:</td>
                    <td><input value={newNumber}
                         onChange={handlenewNumber}/></td>
                </tr> 
            </tbody>
        </table>
        <button type="submit">add</button>
        </form>
        <h2>Numbers</h2>
        <Persons persons={personsToShow} handler={deleteHandler}/>
    </div>
    )
}

export default App