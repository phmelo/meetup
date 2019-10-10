import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import Dashboard from '../pages/dashboard';
import Profile from '../pages/profile';
import Meetup from '../pages/meetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/detail/:id" component={Profile} isPrivate />
      <Route path="/create" component={Meetup} isPrivate />
      <Route path="/edit/:id" component={Meetup} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
