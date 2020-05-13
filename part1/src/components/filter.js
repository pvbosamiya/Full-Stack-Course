import React from 'react'

const Filter = (props) => {

    const search = props.defaultSearch
    const searchPerson = props.eventHandler
    const handleSearch = props.changeHandler

    return (
        <div>
            <h1>Phonebook</h1>
            <form onSubmit={searchPerson}>
            <table>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td><input value={search}
                             onChange={handleSearch}/></td>
                    </tr>
                </tbody>
            </table>
            <button type='submit'>search</button>
            </form>
        </div>
    )
}

export default Filter