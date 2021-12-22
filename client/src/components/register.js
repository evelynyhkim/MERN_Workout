import React, { useState } from "react";
import axios from 'axios';
import { navigate } from '@reach/router';

const Register = () => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPw: "",
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", user, 
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            console.log("res.data", res.data);
            setUser({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPw: "",
            });
            setConfirmReg(
                "Thank you for Registering, you can now log in!",
            );
            setErrors({});
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        });
    };
    return (
        <div>
            <h1>Register</h1>
        {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
        <form onSubmit={register}>
            <div>
                <label>First Name</label>
                {errors.firstName ? (
                    <span className="error-text">
                        {errors.firstName.message}
                    </span>
                ) : null}
                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    //long hand notation
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label>Last Name</label>
                {errors.lastName ? (
                    <span className="error-text">
                        {errors.lastName.message}
                    </span>
                ) : null}
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    //long hand notation
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label>Email</label>
                {errors.email ? (
                    <span className="error-text">{errors.email.message}</span>
                ) : null}
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password</label>
                {errors.password ? (
                    <span className="error-text">
                        {errors.password.message}
                    </span>
                ) : null}
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                {errors.confirmPw ? (
                    <span className="error-text">
                        {errors.confirmPw.message}
                    </span>
                ) : null}
                <input
                    type="password"
                    name="confirmPw"
                    value={user.confirmPw}
                    onChange={handleChange}
                />
            </div>
            <div className="center">
                <button type="submit">Register Me</button>
            </div>
        </form>
        </div>
    )
};
export default Register;