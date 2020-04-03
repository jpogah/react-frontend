import React from 'react';
import { Routes } from './components/routes';
import { MenuAppBar } from './components/menu-app-bar';
import history from './components/history';
import { headers } from './constants';
import { CircularProgress } from '@material-ui/core';

const API_URL = 'http://localhost:8080/';
function App() {
     const [links , setLinks]  = React.useState({});
     const [location, setLocation] = React.useState( localStorage.getItem('location') || '');
     const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('searchTerm') || '');
     const [newReview, setNewReview] = React.useState(undefined);
    const [state, setState] = React.useState({
        degree: '',
        isLoading: true,
        isAuthenticated: false,
        url: 'http://localhost:8080/api/courses',
        username: '',
        password: '',
        hasLoginFailed: false,
        showLoginSuccessMsg: false,
        name: '',
        rating: '',
        reviewText: '',
        isLoading: true
    

    });

    const [courses, setCourses] = React.useState([]);
    const handleChange = (event) => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }


    React.useEffect(()=> {
        localStorage.setItem('searchTerm', searchTerm);
    }, [searchTerm])

    React.useEffect(()=> {
        localStorage.setItem('location', location);
    }, [location])

    const handleSearch = () => {
        let searchParam = '';
        console.log('before url',state.url)
        searchParam = searchTerm ? `searchTerm=${searchTerm}` : searchParam;
        searchParam = location ? `${searchParam}&location=${location}`: searchParam;
        const url = searchParam.length === 0 ? API_URL: `${API_URL}api/courses/search/searchBy?${searchParam.toLowerCase()}`
        console.log('new url', url);
        setState({ url : url});
        console.log('searchparam',searchParam);
        console.log('after url', state.url);
    }

    const handleLogin = ()=> {
        console.log('username', state.username);
        const user = {
            'userName': state.username,
            'password': state.password
        }
        fetch(`${API_URL}login`, {
            method: 'POST',
            body: JSON.stringify(user)
        }).then((response => {
            const jwtToken = response.headers.get('Authorization');
            if (jwtToken !== null){
                console.log('login successful', jwtToken)
                sessionStorage.setItem('jwtToken', jwtToken);
                sessionStorage.setItem('username', state.username);
                setState({isAuthenticated: true})
                history.push('/');
            }
        })).catch(() => {
            console.log('error occured on login')
        })
    }

    const login = () => {
        history.push('/login');
      }
      const logout = () => {
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('username')
        console.log('logout');
        setState({isAuthenticated: false})
       history.push('/');
      }
    
      const isUserSignedIn = () => {
          return sessionStorage.getItem('jwtToken') !== null;
      }


    React.useEffect(() => {
        fetch(state.url, {
            headers: headers,
            method: 'GET'
        }).then(
            response => response.json()).then(result => {
                setCourses(result._embedded.courses);
                setLinks(result._links);
                setState({isLoading: false})
                console.log('courses', result);
            })
    }, [state.url])

    if (state.isLoading) return (<CircularProgress disableShrink  alignitems='center'/>)
     else return (
        <>
       
            <MenuAppBar isAuthenticated={state.isAuthenticated} login={login} logout={logout} />
            <Routes isUserSignedIn={isUserSignedIn} state={state} courses={courses} handleChange={handleChange}
             handleSearch={handleSearch}
             handleLogin={handleLogin} links={links} setState={setState}
             setSearchTerm={setSearchTerm} setLocation={setLocation} 
             searchTerm={searchTerm} location={location} newReview={newReview} setNewReview={setNewReview}/>

        </>)
}

export default App;
