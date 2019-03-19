import React from "react";
import { Route,
         Switch } from "react-router-dom";
import { Home,
         NotFound,
         Login,
         Signup,
         Notes,
         NewNote } from "./containers";
import { AppliedRoute,
         AuthenticatedRoute,
         UnauthenticatedRoute } from "./components"


export default ({childProps}) =>
  <Switch>

      <AppliedRoute path="/" exact component={Home} props={childProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
      <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
      <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />

      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />

  </Switch>;
