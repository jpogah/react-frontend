

export const API_BASE_URL = 'https://fast-forest-98219.herokuapp.com/api'

export const headers = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type': 'application/json'  
})

export const headersForAssociationUpdate = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type':'text/uri-list' 
})

