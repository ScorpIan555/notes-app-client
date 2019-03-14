import React from "react";
import { Route,
         Switch } from "react-router-dom";
import { Home,
         NotFound,
         Login } from "./containers";

export default () =>
  <Switch>

      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />

      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />

  </Switch>;
