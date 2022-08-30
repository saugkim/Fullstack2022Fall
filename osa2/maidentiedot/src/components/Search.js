import React from 'react'

const Search = ({text, filter, handleChange}) => {
  return (
    <div>
        {text} <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Search

