import React from 'react';
import { Routes } from './components/routes';
import { withCookies} from 'react-cookie';
import { MenuAppBar } from './components/menu-app-bar';

const API_URL = '/api/degreePrograms';
function App() {
     const [links , setLinks]  = React.useState({});
    const [state, setState] = React.useState({
        searchTerm: null,
        location: null,
        degree: '',
        isLoading: true,
        isAuthenticated: false,
        user: null,
        url: API_URL,
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
        : `${API_URL}/search/searchBy?${searchParam}`});
        console.log('searchparam',searchParam);
        console.log('after url', state.url);
    }

    const login = ()=> {

    }

    const logout = ()=> {

    }
   

    React.useEffect(() => {
        fetch(state.url).then(
            response => response.json()).then(result => {
                setCourses(result._embedded.degreePrograms);
                setLinks(result._links);
                console.log('courses', result);
            })
    }, [state.url])
    return (
        <>
       
            <MenuAppBar state={state} login={login}  logout={logout}/>
            <Routes state={state} courses={courses} handleChange={handleChange} handleSearch={handleSearch} links={links} setState={setState}/>

        </>)
}

export default App;
