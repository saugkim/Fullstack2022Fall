import Input from './Input'

const Filter = ({filter, handler }) => {
    return(
      <form>
        <Input text='filter shown with ' value={filter} handler={handler} />
      </form>
    )
}

export default Filter