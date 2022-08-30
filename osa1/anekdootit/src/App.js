import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}
const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Result = ( {text,value} ) => {
  return (
    <div>
      <div>{text}</div>
      <div>has {value} votes </div>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [points, setPoints ] = useState([0,0,0,0,0,0,0])  
  const [selected, setSelected] = useState(0)
  
  const getNext = () => {
    const x = Math.floor(Math.random() * 7) 
    setSelected(x)
  }

  const giveVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }


  return (
    <div>
      <Header text='Anecdote of the day' />
      <Result text ={anecdotes[selected]} value={points[selected]} />
      <Button handler={giveVote} text="vote"/>
      <Button handler={getNext} text="next anecdote"/>

      <Header text='Anecdote with most votes' />
      <Result text={anecdotes[points.indexOf(Math.max(...points))]} value={points[points.indexOf(Math.max(...points))]} />
    </div>
  )
}

export default App
