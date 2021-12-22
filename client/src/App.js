import './App.css';
import Login from "./components/login";
import Register from "./components/register"
import Summary from "./components/summary"
import UserProfile from './components/userProfile';
import NewWorkout from './components/NewWorkout';
import EditWorkout from './components/EditWorkout';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register"/>
        <EditWorkout path="/workouts/:id/update"/>
        <NewWorkout path="/new/:userid"/>
        <UserProfile path="/user/profile/:id"/>
        <Summary path="workouts/:id"/>
      </Router>
    </div>
  );
}

export default App;
