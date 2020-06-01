import axios from 'axios'
const baseUrl='/api/persons'

const getDetails=()=>{
    return axios.get(baseUrl)
}

const pushDetails=(obj)=>{
    return axios.post(baseUrl,obj)
}

export default { getDetails,pushDetails}
