

export const API_BASE_URL = process.env.NODE_ENV !=='development' ? 'http://35.194.19.68:30367/api' : 'http://localhost:8080/api';


export const headers = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type': 'application/json'  
})

export const headersForAssociationUpdate = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type':'text/uri-list' 
})

