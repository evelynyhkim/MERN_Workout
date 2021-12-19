import './App.css';
import Login from "./components/login";
import Register from "./components/register"
import Summary from "./components/summary"
import Test from './components/test';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register"/>
        {/* Test is for testing login, replace with Daniels page when ready */}
        <Test path="/workouts"/> 
        <Summary path="workouts/:id"/>
      </Router>
    </div>
  );
}

export default App;
