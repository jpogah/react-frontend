

export const API_BASE_URL = process.env.API_BASE_URL ||  'http://localhost:8080/api';


export const headers = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type': 'application/json'  
})