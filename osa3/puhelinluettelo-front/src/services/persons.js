import axios from 'axios'

//const baseUrl = 'http://localhost:3001/persons'
//const baseUrl = 'http://localhost:3001/api/persons/'
//const baseUrl = 'https://phonebookapp-osa3-2022.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}


const update = async (id, newObject) => {
  console.log('service update line 1')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log('service update line 2')
  const response = await request
  console.log('service update line 3')
  console.log('update', response.data)
  return response.data
}

const remove = async (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove }
