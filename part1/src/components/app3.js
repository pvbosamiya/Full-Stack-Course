import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './note'

const App3 = () => {
    const [newNote, setNewNote] = useState('')
    const [notes, setNotes] = useState([])

    const hook = () => {
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log(response.data)
                setNotes(response.data)
            })
    }

    useEffect(hook, [newNote])

    const submitHandler = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date(),
            important: Math.random() > 0.5,
        }
        
        axios
        .post('http://localhost:3001/notes', noteObject)
        .then(response => {
            setNotes(notes.concat(response.data))
            setNewNote('')
        })
    }

    const handleNewNote = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    console.log("Notes before rendering: ", notes)
    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map((note) =>
                    <Note key={note.id} note={note}/ >
                )}
            </ul>
            <form onSubmit={submitHandler}>
            <table>
                <tbody>
                    <tr>
                        <td>Add:</td>
                        <td><input value={newNote}
                            onChange={handleNewNote}/></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default App3