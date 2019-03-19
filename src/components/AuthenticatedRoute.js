import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) => {
  console.log('props.rest', rest)
  console.log('props.cProps', cProps)
  console.log('props.C', C)

  return (
    <Route
      {...rest}
      render={props =>
        cProps.isAuthenticated
          ? <C {...props} {...cProps} />
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location
                .search}`}
            />}
    />
  )
}
