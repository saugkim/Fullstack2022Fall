import Person from './Person'
import services from '../services/persons'

const Persons = ({persons, filter, handler}) => {
  return (
    <table><tbody>
      {persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase())).map(p => 
        <Person key={p.name} name={p.name} number={p.number} handler={() => handler(p)}/>
      )} 
    </tbody></table>
  )
}

export default Persons