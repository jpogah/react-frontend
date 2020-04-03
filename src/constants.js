



export const headers = new Headers({
    'Authorization' : sessionStorage.getItem('jwtToken'),
    'Content-Type': 'application/json'  
})