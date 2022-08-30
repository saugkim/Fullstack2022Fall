import {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import Content from './components/Content'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log('effect')

    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShow(false)
  }
  
  const showDetail = (event) => {
    setShow(true)
  }

  return (
   <div>
     <Search text='find countries' filter={newFilter} handleChange={handleFilterChange} />
     <Content showCountry={show} showDetail={showDetail} countries={countries} filter={newFilter} />  
   </div> 
  )
}

export default App;
