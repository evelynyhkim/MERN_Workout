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
            <PhotoUpload />
            <h3>Your Workouts</h3>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                {userWorkouts.map((workout, index) => (
                    <tr key={index}>
                        <td>{workout.name}</td>
                        <td>{workout.date}</td>
                        <td>{workout.type}</td>
                        <td>{workout.duration}</td>
                        <div> <Link to={`/workouts/${workout._id}/update`} className="btn btn-primary btn-lg">Edit</Link></div>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default UserProfile