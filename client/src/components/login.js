import React, { useState } from "react";
import axios from 'axios';
import { navigate } from '@reach/router';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email: email,
            passowrd: password,
        },
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                console.log(res, "res")
                console.log(res.data, "is res data!")
                navigate("/workouts", { state: { idForNav: res.data.userId } });
                navigate("/workouts")
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div>
            <h1>Welcome please Sign in or Register</h1>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <button type="submit">Sign In</button>
                    <button><a href="/register">Register</a></button>
                </div>
            </form>
        </div>
    )
}
export default Login;