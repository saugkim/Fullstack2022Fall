import Person from './Person'

const Persons = ( {persons, filter, handler}) => {
  return (
    <table><tbody>
      {persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase())).map(p => 
        <Person key={p.id} name={p.name} number={p.number} handler={() => handler(p)}/>
      )} 
    </tbody></table>
  )
}

export default Persons