const Notification = ({ message}) => {
    if (message === null) {
      return null
    }

    if (message.includes('Information') || message.includes('fail')) {
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