
const ShowList = ({countries, handler}) => {
  return (
    <div>
      {countries.map((c, i) => 
        <div key={i}>
          {console.log(`show id ${i}`)}
          {c.name.common}  
          <button id={i} onClick={handler}>show</button>
        </div>
      )}
    </div>
  )
}

export default ShowList