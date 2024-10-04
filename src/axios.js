import axios from "axios";


const instance = axios.create({
    baseURL: 'http://54.206.12.250:4444'
})

export default instance;