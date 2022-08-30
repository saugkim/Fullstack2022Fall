const Notification = ({ message}) => {
    if (message === null) {
      return null
    }

    if (message.includes('Information')) {
      return (
        <div className="error">
          {message}
        </div>
      )
    } else {
      return (
        <div className="message">
          {message}
        </div>
      )
    }
  }

  export default Notification