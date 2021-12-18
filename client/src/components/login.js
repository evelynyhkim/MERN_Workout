import React from "react";

const Login = () => {

    return(
        <div>
            <h1>Welcome please Sign in or Register</h1>
            <form>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email"/>
                <label htmlFor="password">Password: </label>
                <input type="password" name="passowrd"/>
                <input type="submit" value="Login!"/>
                <button><a href="/register">Register</a></button>
            </form>
        </div>
    )
}
export default Login;