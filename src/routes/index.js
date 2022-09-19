import React from 'react'
import { Switch } from 'react-router'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/dashboard'
import Route from './Route'

export default function index() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  )
}
