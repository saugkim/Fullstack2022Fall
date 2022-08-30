import {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)  
  const [icon, setIcon] = useState('')

  useEffect(() => {
    console.log('effect')

    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setWind(response.data.wind.speed)
        setTemp(response.data.main.temp)
        setIcon(`http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`) 
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(      
    <div>
      <h3>Weather in {city}</h3>
      <div>temperature {temp} celcius</div>
      <img alt='weather icon' src={icon} />
      <div>wind {wind} m/s</div>
    </div>
  )
}

export default Weather