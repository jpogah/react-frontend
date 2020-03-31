import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isUserLoggedIn } from './components/authentication-service'

export const AuthenticatedRoute = ({location,...props}) => {
    
        if (isUserLoggedIn()) {
            return <Route {...props} />
        } else {
            return <Redirect to="/login" location={location} />
        }
  
}