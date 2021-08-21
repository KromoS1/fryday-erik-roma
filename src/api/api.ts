import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const apiPing = {
    pingGet(){
        return axiosInstance.get("/ping").then(response => {
            console.log(response)
        })
    }
}