import { useState } from 'react'

const Header = (props) => {
  return (
    <h2>{props.content}</h2>
  )
}

const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === "average") {
    return (
      <tr>
        <td>{text}</td><td>{value.toFixed(1)}</td>
      </tr>
    )
  }
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td><td>{value.toFixed(1)} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({number1, number2, number3, avg, pos}) => {
  const all = number1 + number2 + number3

  if (all === 0) {
    return (
      <div> No feedback given</div>
    )
  }

  return (
    <table><tbody>
      <StatisticLine text='good' value={number1} />
      <StatisticLine text='neutral' value={number2} />
      <StatisticLine text='bad' value={number3} />
      <StatisticLine text='all' value= {number1+number2+number3} />
      <StatisticLine text='average' value={avg} />
      <StatisticLine text="positive" value={pos}/>
    </tbody></table>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const clickButton = (values) => {
    console.log(values)
    setGood(good + values[0])
    setNeutral(neutral + values[1])
    setBad(bad + values[2])
    setAll(all + 1)
  }

  return (
    <div>
      <Header content='feedback' />
      <Button handler={() => clickButton([1,0,0])} text='good' />
      <Button handler={() => clickButton([0,1,0])} text='neutral' />
      <Button handler={() => clickButton([0,0,1])} text='bad' />
      <Header content='statistic' />
      <Statistics number1={good} number2={neutral} number3={bad} avg={(good-bad)/all} pos={good/all*100} />      
    </div>
  )
}

export default App