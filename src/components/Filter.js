import React from 'react'

const Filter=(props)=>{
    return(
      <div>
    <p> {props.name} </p>
    <input  className='search' value={props.value} 
      onChange={props.onChange}
      />
      </div>
    )
  }
  export default Filter 
  