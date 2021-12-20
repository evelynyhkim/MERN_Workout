import './App.css';
import Login from "./components/login";
import Register from "./components/register"
import Summary from "./components/summary"
import UserProfile from './components/userProfile';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register"/>
        <UserProfile path="/user/profile/:id"/>
        <Summary path="workouts/:id"/>
      </Router>
    </div>
  );
}

export default App;
