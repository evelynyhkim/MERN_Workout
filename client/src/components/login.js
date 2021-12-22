import React, { useState } from "react";
import axios from 'axios';
import { navigate, Link } from '@reach/router';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios.post("http://linuxhome:8000/api/users/login", {
            email: email,
            password: password,
        },
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                console.log(res, "res")
                console.log(res.data, "is res data!")
                localStorage.setItem("userid", res.data.userId);
                navigate(`/user/profile/${res.data.userId}`, { state: { idForNav: res.data.userId } });
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div>
            <h1 className="mt-5">Welcome please Sign in or Register</h1>
            <div style={{ maxWidth: "500px",
                          width: "40%",
                          marginRight: "auto",
                          marginLeft: "auto"        
                    }}>           
                <p className="error-text">{errorMessage ? errorMessage : ""}</p>
                <form onSubmit={login}>
                    <div className="d-flex align-items-center">
                        <label className="form-label flex-1 text-end me-2 fs-3">Email:</label>
                        <input
                            className="form-control flex-2"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="d-flex align-items-center">
                        <label className="form-label flex-1 text-end me-2 fs-3">Password:</label>
                        <input
                            className="form-control flex-2"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="center">
                        <button className="btn btn-secondary mt-3 ms-3" type="submit">Sign In</button>
                        <button className="btn btn-secondary mt-3 ms-3"><Link className="text-decoration-none text-white" to="/register">Register</Link></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;