import React, {useState, useEffect} from 'react'
import Filter from './filter'
import Persons from './persons'
import personService from '../services/persons'
import '../index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setnewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [search, setSearch] = useState('')
    const [useSearch, setUseSearch] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

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
        console.log("Fetching ...")
        personService.get().then(initialData => setPersons(initialData))
    }

    const checkPresence = (person) => person.name === newName

    const deleteHandler = (person) => {
        const handler = () => {
            personService.remove(person.id).catch(error => {
                setErrorMessage(`Information of ${person.name} has already been removed from server.`)
                setTimeout(() => setErrorMessage(null), 5000)
            })
            setPersons(persons.filter(validPerson => validPerson.id !== person.id))
        }

        return handler
    }

    useEffect(hook, [newName])

    const handleSearch = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
        setUseSearch(true)
    }

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
                        personService.update(persons[searchIndex].id, newPerson).then(updatedPerson =>
                            {
                                setPopUpMessage(`Updated '${updatedPerson.name}'`)
                                setTimeout(() => setPopUpMessage(null), 5000)
                            })
                    }
                }
                else
                {
                    setPopUpMessage(`No new data '${newName} ${newNumber}', skipping update ...`)
                    setTimeout(() => setPopUpMessage(null), 5000)
                }
            }
            else
            {
                const newPerson = { 
                    name: newName,
                    number: newNumber
                }

                personService.create(newPerson).then(newPersonR =>
                    {
                        setPersons(persons.concat(newPersonR))
                        setPopUpMessage(`Added '${newPersonR.name}'`)
                        setTimeout(() => setPopUpMessage(null), 5000)
                    })
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

    console.log("Rendering ...", persons)
    return (
    <div>
        <Filter changeHandler={handleSearch} defaultSearch={search} message={popUpMessage} errorMessage={errorMessage}/>
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