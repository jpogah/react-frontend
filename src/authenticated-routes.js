import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const AuthenticatedRoute = ({isUserSignedIn,location,...props}) => {
    
        if (isUserSignedIn) {
            return <Route {...props} />
        } else {
            return <Redirect to="/login" location={location} />
        }
  
}