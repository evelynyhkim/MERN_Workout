import './App.css';
import Login from "./components/login";
import Register from "./components/register"
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register"/>
      </Router>
    </div>
  );
}

export default App;
