import React from 'react'

const Filter = (props) => {

    const search = props.defaultSearch
    const handleSearch = props.changeHandler

    return (
        <div>
            <h1>Phonebook</h1>
            <form>
            <table>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td><input value={search}
                             onChange={handleSearch}/></td>
                    </tr>
                </tbody>
            </table>
            </form>
        </div>
    )
}

export default Filter