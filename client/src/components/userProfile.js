import React, { useEffect, useState } from "react"
import axios from 'axios';
import PhotoUpload from './photoUpload';
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
            .get('http://localhost:8000/api/workouts/all')
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
            <h1>{user.firstName} {user.lastName}'s profile</h1>
            {/* User before photo */}
            {/* User after photo */}
            <br/>
            <br/>
            <PhotoUpload />
            <h3>User Workouts</h3>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default UserProfile