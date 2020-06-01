import axios from 'axios'
import React from 'react' 

const Person=(props)=>{

    const deleteRecord=(id)=>{
      const nameOfPerson=props.personsToShow.filter(p=>p.id===id)
      console.log(nameOfPerson)
      const result =window.confirm(`delete ${nameOfPerson[0].name} from contacts ?`)
      if(result)
      {
      console.log(`delete record with id ${id}`)
      const url=`/api/persons/${id}`
      axios.delete(url)
      .then(response=>{
        props.func(props.personsToShow.filter(p=>p.id!==id))
      })
      .catch(error=>{
      props.style('error')
      console.log(props.style)
      props.err(`${nameOfPerson[0].name} has already been removed from server!!`)
       setTimeout(()=>{
      props.err(null)
       },5000) 
      })
    }
    }  
          return(
          <div>
            {props.personsToShow.map((x,id)=>
        <div key={x.id}>  {x.name}  {x.number}
        <button onClick={()=>deleteRecord(x.id)}>delete</button>
        </div>
        )}
          </div>
        )
      }
      export default Person