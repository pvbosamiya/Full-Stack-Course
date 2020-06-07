import React from 'react'

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null
  }

  let displayMessage = errorMessage
  let cssTag = "error"
  if (errorMessage === null)
  {
      displayMessage = message
      cssTag = "update"
  }

  return (
      <div className={cssTag}>
          {displayMessage}
      </div>
  )

}

export default Notification