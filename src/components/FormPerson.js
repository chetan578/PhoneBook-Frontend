import React from 'react'

const FormsPerson=(props)=>{
    return(
      <div>
        <form onSubmit={props.onSubmit}>
          <div>
            name: <input value={props.namevalue}
            onChange={props.onChangeName}/>
          </div>
          <div>
            number: <input value={props.numbervalue}
            onChange={props.onChangeNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }
  export default FormsPerson