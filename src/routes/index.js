import { Switch } from 'react-router'
import SignIn from '../pages/SignIn/signIn'
import SignUp from '../pages/SignUp/signUp';
import Dashboard from '../pages/dashboard/dashboard'
import Route from './Route'
import Profile from '../pages/profile/profile';
import Customers from '../pages/customers/Customers';
import New from '../pages/new/New';

export default function index() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
      <Route exact path="/new" component={New} isPrivate />
    </Switch>
  )
}
