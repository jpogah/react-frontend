

export const API_BASE_URL = process.env.NODE_ENV !=='development' ? 'https://fast-forest-98219.herokuapp.com/api' : 'http://localhost:8080/api';


export const headers = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type': 'application/json'  
})

export const headersForAssociationUpdate = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type':'text/uri-list' 
})

