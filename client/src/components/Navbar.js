import React from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';

const Navbar = props => {

const {id} = props;

const logout = (e) =>{
    axios.post("http://localhost:8000/api/users/logout",{},{withCredentials: true})
    .then((res) =>{
        localStorage.removeItem('userid')
        navigate("/")
    })
    .catch((err) =>{
        console.log(err)
    })
}

return (
    <nav>
        <div style= {{backgroundColor: 'grey', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px'}}>
            <h2>The Workout App</h2>
                <div>
                    <ul style={{listStyle: 'none'}}>
                        <li>
                            <Link className="btn btn-primary btn-lg" to="/home">Home</Link> || 
                            <Link className="btn btn-primary btn-lg" to={`/new/${id}`}>Create New Workout</Link> || 
                            <button className="btn btn-primary btn-lg" onClick={logout}>Logout</button>
                        </li>
                    </ul>
            </div>
        </div>
    </nav>
)
}

export default Navbar;