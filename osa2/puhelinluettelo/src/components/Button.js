const Button = ({text, handler}) => {
  return (
    <div>
      <button type="submit" onClick={handler}>{text}</button>
    </div>
  )
}

export default Button