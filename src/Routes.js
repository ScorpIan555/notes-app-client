import React from "react";
import { Route,
         Switch } from "react-router-dom";
import { Home,
         NotFound,
         Login,
         Signup } from "./containers";
import { AppliedRoute } from "./components"

export default ({childProps}) =>
  <Switch>

      <AppliedRoute path="/" exact component={Home} props={childProps} />
      <AppliedRoute path="/login" exact component={Login} props={childProps} />
      <AppliedRoute path="/signup" exact component={Signup} props={childProps} />


      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />

  </Switch>;
