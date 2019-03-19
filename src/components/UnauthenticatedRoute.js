import React from "react";
import { Route, Redirect } from "react-router-dom";


function querystring(name, url = window.location.href) {
  console.log('UnauthenticatedRoute.name.raw', name)
  name = name.replace(/[[]]/g, "\\$&");

  console.log('UnauthenticatedRoute.name.replaced', name)
  console.log('UnauthenticatedRoute.url', url)

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


export default ({ component: C, props: cProps, ...rest }) => {
  console.log('props.rest', rest)
  console.log('props.cProps', cProps)
  console.log('props.C', C)

  const redirect = querystring("redirect");

  return(
    <Route
      {...rest}
      render={props =>
        !cProps.isAuthenticated
          ? <C {...props} {...cProps} />
          : <Redirect to={redirect === "" || redirect === null ? "/" : redirect}
          />}
    />
  )

}
