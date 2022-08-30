import Button from './Button'

const Person = ({name, number, handler}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><Button text="delete" handler={handler} /></td>
    </tr>
  )
}

export default Person