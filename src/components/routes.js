import React from 'react';
import {  Router, Switch, Route} from 'react-router-dom';
import { Home } from './home';
import { Course } from './course';
import history from './history';







export const Routes = ({state,courses, handleChange, handleSearch, links, setState}) => {
    return (
        <Router history={history}>
        <Switch>
        <Route  exact path="/"  render={(props)=><Home state={state} courses={courses} handleChange={handleChange} handleSearch={handleSearch} links={links} setState={setState} /> } />
        <Route path="/degreePrograms/:id"  component={Course} />
        </Switch>
        </Router>
    )
}