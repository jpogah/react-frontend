import React from 'react';
import {  Router, Switch, Route} from 'react-router-dom';
import { Home } from './home';
import { Course } from './course';
import history from './history';
import {Review} from './review';
import { AuthenticatedRoute } from '../authenticated-routes';
import { Login } from './login';







export const Routes = ({isAuthenticated, state,courses, handleChange, handleSearch, links, setState,
   handleLogin, setSearchTerm, setLocation,searchTerm,location , setCurrentUrl, setCourses}) => {
    return (
        <Router history={history}>
        <Switch>
        <Route  exact path="/"  render={(props)=><Home setCurrentUrl={setCurrentUrl} setSearchTerm={setSearchTerm} setLocation={setLocation} searchTerm={searchTerm} location={location} courses={courses}  handleSearch={handleSearch} links={links} setState={setState}  /> } />
        <Route path="/courses/:id"  render={(props)=><Course courses={courses} />} />
       <AuthenticatedRoute  path="/course/:id/reviews" isAuthenticated={isAuthenticated}  render={(props)=><Review courses={courses} setCourses={setCourses}/>} />
        <Route path='/login' render={(props)=><Login state={state} handleChange={handleChange} handleLogin={handleLogin}/>} />
      </Switch>
        </Router>
    )
}