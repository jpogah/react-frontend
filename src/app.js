import React from 'react';
import { Routes } from './components/routes';
import { withCookies} from 'react-cookie';
import { MenuAppBar } from './components/menu-app-bar';
import { performJwtAuth, onSuccessfulLogin, isUserLoggedIn } from './components/authentication-service';
import history from './components/history';

const API_URL = 'http://localhost:8080/api/';
function App() {
     const [links , setLinks]  = React.useState({});
     const [ review, setReview] = React.useState({});
     const [ currentProgramId, setCurrentProgramId] = React.useState(undefined);
    const [state, setState] = React.useState({
        searchTerm: null,
        location: null,
        degree: '',
        isLoading: true,
        isAuthenticated: false,
        user: null,
        url: 'http://localhost:8080/api/courses',
        username: '',
        password: '',
        hasLoginFailed: false,
        showLoginSuccessMsg: false,
        name: '',
        rating: '',
        reviewText: '',
    

    });

    const [courses, setCourses] = React.useState([]);
    const handleChange = (event) => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }


    const handleSearch = () => {
        let searchParam = '';
        console.log('before url',state.url)
        searchParam = state.searchTerm ? `searchTerm=${state.searchTerm}` : searchParam;
        searchParam = state.location ? `${searchParam}&location=${state.location}`: searchParam;
        setState({ url : searchParam.length === 0 ? API_URL
        : `${API_URL}courses/search/searchBy?${searchParam}`});
        console.log('searchparam',searchParam);
        console.log('after url', state.url);
    }

    const handleLogin = ()=> {
        console.log('username', state.username);
        performJwtAuth(state.username, state.password).then((response) =>{
            setState({isAuthenticated: true});
           onSuccessfulLogin(state.username, response.headers.get('Authorization'))
            history.push( '/');
        }).catch(() => {
            setState({ showLoginSuccessMsg: false, hasLoginFailed: true});
        })

    }

    const login = () => {
        history.push('/login');
      }
      const logout = () => {
        sessionStorage.removeItem('authenticatedUser');
        console.log('logout');
        setState({isAuthenticated: false})
       history.push('/');
      }
    


    React.useEffect(() => {
        fetch(state.url).then(
            response => response.json()).then(result => {
                setCourses(result._embedded.courses);
                setLinks(result._links);
                console.log('courses', result);
            })
    }, [state.url])
    return (
        <>
       
            <MenuAppBar state={state} login={login} logout={logout} />
            <Routes state={state} courses={courses} handleChange={handleChange}
             handleSearch={handleSearch}
             handleLogin={handleLogin} links={links} setState={setState}
             setCurrentProgramId={setCurrentProgramId} />

        </>)
}

export default App;
