import React from 'react';
import { Routes } from './components/routes';
import { MenuAppBar } from './components/menu-app-bar';
import history from './components/history';
import { headers, API_BASE_URL } from './constants';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { BottomBar } from './components/bottom-bar';

const useStyles = makeStyles((theme) => ({
    indicator: {
      marginLeft: '50%',
      marginTop: '25%'
    },
  }));

function App() {
    const classes = useStyles();
     const [links , setLinks]  = React.useState({});
     const [location, setLocation] = React.useState( localStorage.getItem('location') || '');
     const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('searchTerm') || '');
     const [courses, setCourses] = React.useState([]);
     const [isAuthenticated, setIsAuthenticated] = React.useState(sessionStorage.getItem('jwtToken') !== null);
     const [currentUrl, setCurrentUrl] = React.useState(`${API_BASE_URL}/courses`)
    const [state, setState] = React.useState({
        degree: '',
        isLoading: true,
        username: '',
        password: '',
        hasLoginFailed: false,
        showLoginSuccessMsg: false,
        email: '',
        name: '',
        rating: '',
        reviewText: '',
        isLoading: true
    

    });

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
        searchParam = searchTerm ? `searchTerm=${searchTerm.toLowerCase()}` : searchParam;
        searchParam = location ? `${searchParam}&location=${location.toLowerCase()}`: searchParam;
        const url = searchParam.length === 0 ? currentUrl: `${API_BASE_URL}/courses/search/searchBy?${searchParam}`
        console.log('new url', url);
        setCurrentUrl(url);
        console.log('searchparam',searchParam);
        console.log('after url', url);
    }

    const handleSignup = () => {
        const user = {
            'userName': state.username,
            'password': state.password,
            'email' : state.email
        }
        console.log(user);
        fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json' 
            }),
            body: JSON.stringify(user)
        }).then((response => {
            if (response.ok){
                const loginUser = {
                    'userName': state.username,
                    'password': state.password,
                }
            logingFetchReq(loginUser);
            }
            
        })).catch(() => {
            console.log('error occured on signup')
        })

    }
    const logingFetchReq= (user) => {
        fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user)
        }).then((response => {
            const jwtToken = response.headers.get('Authorization');
            if (jwtToken !== null){
                console.log('login successful', jwtToken)
                setIsAuthenticated(true);
                sessionStorage.setItem('jwtToken', jwtToken);
                sessionStorage.setItem('username', state.username);
                getUser(state.username);
                history.push('/');
            }
        })).catch(() => {
            console.log('error occured on login')
        })

    };

    const handleLogin = ()=> {
        console.log('username', state.username);
        const user = {
            'userName': state.username,
            'password': state.password
        }
        logingFetchReq(user);
      
    }

    const getUser= (username) => {
        fetch(`${API_BASE_URL}/users?username=${username}`,{
            headers: headers,
            method: 'GET'
        }).then( (resp) => {
            return resp.json()
        }).then((result) => {
         sessionStorage.setItem('userLink', result._embedded.users[0]._links.self.href);
        }).catch(() => console.error('error occured while fetching user'));
    }

    const signup = () => {
        history.push('/signup');
    }
    const login = () => {
        history.push('/login');
      }
      const logout = () => {
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('username')
        console.log('logout');
       setIsAuthenticated(false);
       history.push('/');
      }



    React.useEffect(() => {
        fetch(currentUrl).then(
            response => response.json()).then(result => {
             setCourses(result._embedded.courses);
                setLinks(result._links);
                setState({isLoading: false})
                console.log('courses', result);
            })
    }, [currentUrl])

    if (state.isLoading) return (<div className={classes.indicator}><CircularProgress  size={60} disableShrink alignitems='center'/></div>)
     else return (
        <>
       
            <MenuAppBar isAuthenticated={isAuthenticated} login={login} logout={logout} signup={signup} />
            <Routes isAuthenticated={isAuthenticated} state={state}  setCurrentUrl={setCurrentUrl} courses={courses} handleChange={handleChange}
             handleSearch={handleSearch}
             handleLogin={handleLogin} links={links} setState={setState}
             setSearchTerm={setSearchTerm} setLocation={setLocation} 
             searchTerm={searchTerm} location={location}  setCourses={setCourses} signup={signup} handleSignup={handleSignup}/>
           <BottomBar />
        </>)
}

export default App;
