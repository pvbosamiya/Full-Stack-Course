import React from 'react'
import Notification from "./notification";

const Filter = (props) => {

    const search = props.defaultSearch
    const handleSearch = props.changeHandler
    const message = props.message
    const errorMessage = props.errorMessage

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} errorMessage={errorMessage}/>
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