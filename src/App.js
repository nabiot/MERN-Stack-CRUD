import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MembershipList from './membershipList';
import CreateMembers from './createMembersList';
import EditList from './EditList';
import Contact from './contact';
import Location from './Location';
import Follow from './followUs';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <ul className="nav-bars">
            <li>
              <Link to='/'> Home </Link>
            </li>
            <li>
              <Link to='/'> Members List </Link>
            </li>
            <li>
              <Link to='/create'> Register Here </Link>
            </li>
          </ul>
        </div>
        <Route path = '/' exact component={MembershipList}></Route>
        <Route path = '/create' component={CreateMembers}></Route>
        <Route path = '/edit/:id' component={EditList}></Route>
      </div> 
      <div>
        <ul className="nav-bars">
            <li>
              <Link to='/contact'> Contact </Link>
            </li>
            <li>
              <Link to='/location'> Address </Link>
            </li>
            <li>
              <Link to='/follow'> Follow us </Link>
            </li>
            <Route path='/contact' component={Contact}></Route>
            <Route path='/location' component={Location}></Route>
            <Route path='/follow' component={Follow}></Route>
          </ul>
      </div>
    </Router>
  );

}

export default App;
