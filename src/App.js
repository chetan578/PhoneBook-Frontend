import React,{useState,useEffect} from 'react';
import Filter from './components/Filter'
import FormsPerson from './components/FormPerson'
import Person from './components/Person'
import Service from './services/persons'
import axios from 'axios';
import './index.css'

const App = () => {
    // yeh wala usestate array of objects hai logo ki details ka 
    const [ persons, setPersons ] = useState([])
    // isko mujhe dusre module mai use karna hai to delete record 
    const [newName, setNewName ] = useState('')
    const [newNumber,setNewNumber]=useState('')
    const[filtername,setfilterName]=useState('')
    let [personsToShow,setPersonsToShow]=useState(persons)
    const [showAll,setshowAll]=useState(true)
    const[message,setMessage]=useState(null)
    const [style,setstyle]=useState('no-error')
    
    useEffect(()=>{
     Service.getDetails().then(response=>{
       setPersons(response.data);
     })
     },[])
  
    const handleName=(event)=>{
      setNewName(event.target.value)
    }
    const handleNumber=(event)=>{
      setNewNumber(event.target.value)
    }
  
    const handlefilterName=(event)=>{
      let value=event.target.value
      setfilterName(value)
      setshowAll(false)
      const result=persons.filter(x=>x.name.includes(value))
      setPersonsToShow(result)
      }
  
    const addNameandNumber=(event)=>{
      event.preventDefault()
      const obj={
        name:newName.trim(),
        number:newNumber.trim()
      }
      const samePerson =persons.find(p=>p.name.toLowerCase()===obj.name)
      console.log(samePerson)
    if(samePerson){
const result= window.confirm(`${samePerson.name.trim()} is already added to the phonebook,replace old number with the new one ?`)
        if(result===true)
        {
        const  id=samePerson.id
        const url=`/api/persons/${id}`
        const changedPerson={...samePerson,number:newNumber}
        axios.put(url,changedPerson).then(response=>{
            setPersons(persons.map(p=>p.id!==id?p:response.data))
        })
      setMessage(`Changed ${newName}'s  phone number to ${newNumber}`)
      setTimeout(()=>{
        setMessage(null)
      },5000)
       setNewName('')
       setNewNumber('')
        }
      }
      else{
      Service.pushDetails(obj)
      .then(response=>{
        setPersons(persons.concat(response.data))
      })
      .catch(error=>{
        console.log(error.message)
        setMessage(error.message)
      })
      setMessage(`Added ${newName.trim()}`)
      setTimeout(()=>{
        setMessage(null)
      },5000)

      setNewName('')
      setNewNumber('')
    }
    }
    const Notification=(props)=>{
      if(props.message===null)
      return null
      console.log(props.message)
      console.log(props.value)
      return(
        <div className={props.value}>
          {props.message}
        </div>
      )
   
  }
    return (
      <div className='container'>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <h1>Phonebook</h1>
        <Notification message={message} value={style} />
        <Filter name='filter shown with'
        value={filtername} onChange={handlefilterName}/>
  
        <h3>Add a new Name </h3>
      <FormsPerson onSubmit={addNameandNumber}
      namevalue ={newName} numbervalue={newNumber} onChangeName={handleName} 
      onChangeNumber={handleNumber}/>
  
        <h2>Numbers</h2>   
        <Person func={setPersons} err={setMessage} style ={setstyle} personsToShow={showAll?persons:personsToShow}  />
        </div> 
    )
  }
  export default App 