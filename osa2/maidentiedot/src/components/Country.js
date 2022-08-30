import Weather from './Weather'

const Country = ({maa}) => {
//  console.log(maa.languages)
  const values = Object.values(maa.languages)
  
  return (
    <div> 
      <h2>{maa.name.common}</h2>
      <br />
      <div>capital {maa.capital}</div>
      <div>area {maa.area}</div>
      <br />
      <div><b>languages:</b></div>
      <ul>
        {values.map( key => 
          <li key={key}>{key}</li>
        )}
      </ul>
      <br />
      <img alt="flags" src={maa.flags.png} width="160" />
      <br />
      <Weather city={maa.capital} />
    </div>
  )
}

export default Country