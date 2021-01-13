import React from 'react'
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ loggedIn, children, ...rest }) {
  return (
    <Route {...rest} render={() => {
      return loggedIn === true ? children : <Redirect to="/" />
    }} />
  )
}
