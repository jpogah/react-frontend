;


const API_URL = 'http://localhost:8080';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

export const performJwtAuth = (username, password) => {
    console.log(username);
    const user = {userName: username, password:password};
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user)
    })
}

const headers = new Headers({
    'Authorization' : sessionStorage.getItem('token'),
    'Content-Type': 'application/json'  
}) ;

export const onSuccessfulLogin = (username, token) => {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    sessionStorage.setItem('token',token );
    // Need to store the user reviews links in session


    fetch(`${API_URL}/api/users/search/searchByUserName?username=${username}`,{
       method: 'GET',
       headers: headers 
    }
    ).then(response => {
        response.json().then(result => {
            console.log('reviewLinks', result._links.self.href);
            sessionStorage.setItem('reviewLink', result._links.self.href);
        })
    }).catch( () => {
        console.log('error fetching user data')
    })
  //  setupAxiosInterceptors(createJWTToken(token))
}

export const fetchData = ( url ) => {
    fetch(url,{
        method: 'GET',
        headers: headers 
     }
     ).then(response => {
       return response.json()}).then(result => {
           return result;
         }
     ).catch( () => {
         console.log('error fetching user data')
     })
}

export const createJWTToken= (token) => {
    return 'Bearer ' + token
}

export const logout = () => {
    console.log('remove user name: ', sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME))
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    console.log('removing token: ')
   // sessionStorage.removeItem('token', sessionStorage.getItem('token'));
}

export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
}

export const getLoggedInUserName = () => {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
}

// export const setupAxiosInterceptors = (token) => {
//     axios.interceptors.request.use(
//         (config) => {
//             if (isUserLoggedIn()) {
//                 config.headers.authorization = token
//             }
//             return config
//         }
//     )
// }



