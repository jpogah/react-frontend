import React from 'react';
import {  Router, Switch, Route} from 'react-router-dom';
import { Home } from './home';
import { Course } from './course';
import history from './history';
import {Review} from './review';
import { AuthenticatedRoute } from '../authenticated-routes';
import { Login } from './login';







export const Routes = ({state,courses, handleChange, handleSearch, links, setState, handleLogin}) => {
    return (
        <Router history={history}>
        <Switch>
        <Route  exact path="/"  render={(props)=><Home state={state} courses={courses} handleChange={handleChange} handleSearch={handleSearch} links={links} setState={setState}  /> } />
        <Route path="/courses/:id"  component={Course} />
       <AuthenticatedRoute  path="/:id/reviews"  component={Review} />
        <Route path='/login' render={(props)=><Login state={state} handleChange={handleChange} handleLogin={handleLogin}/>} />
      </Switch>
        </Router>
    )
}