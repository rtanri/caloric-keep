import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from "../data/services/AuthProvider"

const GuestOnlyRoute = ({ component: Component, ...otherProps }) => {
  const { token } = useContext(AuthContext)
  
  return (
    <Route
      {...otherProps}
      render={props => (
        token ?
          <Redirect to='/dashboard' /> :
          <Component {...props} />
      )}
    />
  )
}

export default GuestOnlyRoute
