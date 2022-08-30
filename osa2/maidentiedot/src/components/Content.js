import Country from  './Country'
import {useState} from 'react'

const Content = ( {countries, filter, showDetail, showCountry} ) => {

  const maat = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())) 
  const [id, setId] = useState(0)
  
  const showSelected = (x) => {
    setId(x)
    showDetail()
  }
  function showSelectedf(x) {
    setId(x)
    showDetail()
  }

  if (maat.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (maat.length === 1) {
    return (
      <Country maa={maat[0]} />
    )
  }

  if (showCountry) {
    return (
      <Country maa={maat[id]} />
    )
  } else {
    return (
      <div>
        {maat.map((c, i) => 
          <div key={i}>
            {c.name.common}  
            <button id={i} onClick={() => showSelected(i)}>show</button>
          </div>
        )}
      </div>
    )
  }
}

export default Content