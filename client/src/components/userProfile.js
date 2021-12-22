import React, { useEffect, useState } from "react"
import axios from 'axios';
import PhotoUpload from './photoUpload';
import {Link, navigate} from '@reach/router';
import Navbar from './Navbar';


const UserProfile = (props) => {
    const [user, setUser] = useState([]);
    const [workouts, setWorkouts] = useState([]);   
    //logged in userId
    const { id } = props;
    //all workouts where userid matches logged user id 
    const userWorkouts = workouts.filter(workout => workout.userid === id)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
        .then((res) => {
            console.log("Getting profile for " + res.data.firstName, res.data.lastName);
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios 
            .get(`http://localhost:8000/api/workouts/all/${id}`)
            .then((res) => {
                console.log("Loading all workouts")
                setWorkouts(res.data)
                console.log("Filtered Workouts" + userWorkouts)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Navbar id={id}/>
                <header className="py-5">
                    <div className="container px-lg-5">
                        <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
                            <div className="m-4 m-lg-5">
                                <h1 className="display-5 fw-bold">Welcome, {user.firstName} {user.lastName}!</h1>
                            </div>
                        </div>
                    </div>
                </header>
            {/* User before photo */}
            {/* User after photo */}
            <br/>
            <br/>
            <p>
                <button className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Add your before/after pictures!
                </button>
            </p>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <PhotoUpload />
                </div>
            </div>
            <div>
            <h3>Your Workouts</h3>
            </div>
            <div>
            <table className="table">
                <thead>
                    <th scope="col1">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Actions</th>
                </thead>
                <tbody>
                {userWorkouts.map((workout, index) => (
                    <tr key={index}>
                        <td>{workout.name}</td>
                        <td>{workout.type}</td>
                        <td>{workout.duration}</td>
                        <td> <Link to={`/workouts/${workout._id}/update`} className="btn btn-primary btn-sm">Edit</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default UserProfile