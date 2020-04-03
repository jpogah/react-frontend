import React from 'react';
import {  Router, Switch, Route} from 'react-router-dom';
import { Home } from './home';
import { Course } from './course';
import history from './history';
import {Review} from './review';
import { AuthenticatedRoute } from '../authenticated-routes';
import { Login } from './login';







export const Routes = ({isAuthenticated, state,courses, handleChange, handleSearch, links, setState,
   handleLogin, setSearchTerm, setLocation,searchTerm,location, newReview, setNewReview, isUserSignedIn }) => {
    return (
        <Router history={history}>
        <Switch>
        <Route  exact path="/"  render={(props)=><Home setSearchTerm={setSearchTerm} setLocation={setLocation} searchTerm={searchTerm} location={location} courses={courses}  handleSearch={handleSearch} links={links} setState={setState}  /> } />
        <Route path="/courses/:id"  render={(props)=><Course newReview={newReview} setNewReview={setNewReview} />} />
       <AuthenticatedRoute isUserSignedIn={isUserSignedIn} path="/course/:id/reviews"  render={(props)=><Review newReview={newReview} setNewReview={setNewReview} />} />
        <Route path='/login' render={(props)=><Login state={state} handleChange={handleChange} handleLogin={handleLogin}/>} />
      </Switch>
        </Router>
    )
}