import Input from './Input'
import Button from './Button'

const PersonForm = ({name, number, namdHandler, numberHandler, addPersonHandler}) => {
  return (
    <form>
      <Input text='name' name={name} handler={namdHandler} />
      <Input text='number' name={number} handler={numberHandler} />
      <Button text='add' handler={addPersonHandler} />
    </form>
  )
}

export default PersonForm