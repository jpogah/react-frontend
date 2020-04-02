import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const AuthenticatedRoute = ({isAuthenticated,location,...props}) => {
    
        if (isAuthenticated) {
            return <Route {...props} />
        } else {
            return <Redirect to="/login" location={location} />
        }
  
}