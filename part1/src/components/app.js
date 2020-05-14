import React, {useState, useEffect} from 'react'
import Filter from './filter'
import Persons from './persons'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setnewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [search, setSearch] = useState('')
    const [useSearch, setUseSearch] = useState(false)

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/db')
                .then(response => {
                    console.log('promise fulfilled')
                    setPersons(response.data.persons)
                })
    }

    useEffect(hook, [])

    const findPersonFunc = (person) => {
        let name = person.name.toLowerCase()
        if (name.includes(search))
        {
            console.log("Found: ", search, " in ", name)
            return true
        }

        return false
    }

    const personsToShow = useSearch ? persons.filter(findPersonFunc) : persons

    const searchPerson = (event) => {
        event.preventDefault()
        setUseSearch(true)
    }

    const handleSearch = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const checkPresence = (person) => person.name === newName

    const addnewName = (event) => {
        event.preventDefault()
        if (newName.length !== 0)
        {
            let searchIndex = persons.findIndex(checkPresence)
            console.log("Found ", newName, " at index ", searchIndex)
            if (searchIndex !== -1)
            {
                alert(newName + ' is already added to phonebook')
            }
            else
            {
                const newPerson = { 
                    name: newName,
                    number: newNumber
                }
                setPersons(persons.concat(newPerson))
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

    console.log(personsToShow)
    return (
    <div>

        <Filter eventHandler={searchPerson} changeHandler={handleSearch} defaultSearch={search}/>
        <h2>Add</h2>
        <form onSubmit={addnewName}>
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
        <Persons persons={personsToShow} />
    </div>
    )
}

export default App