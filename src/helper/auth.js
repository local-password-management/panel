import axios from 'axios';

const API_URL = 'http://localhost/pass/public/api/';
const AUTH_URL ='http://localhost/pass/public/';

export default class Auth {
    constructor(){}

     Api(){
        return axios.create({
            baseURL: API_URL,
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        });
     } 
     Login(){
         return axios.create({
            baseURL: AUTH_URL,
            timeout: 1000
        });
     }

}
