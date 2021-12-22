import React, { useState, useEffect } from 'react';
import {Link, navigate } from '@reach/router';
import axios from 'axios';
import Navbar from './Navbar';


const AllWorkouts = (props) => {


    const [workoutList, setWorkoutList] = useState([]);

    useEffect(()=>{
        axios.get("http://linuxhome:8000/api/workouts/all")
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setWorkoutList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

    }, []);

    const deleteWorkout = (idFromBelow) => {
        axios
        .delete(`http://linuxhome:8000/api/${idFromBelow}/delete`)
        .then((res) => {
            console.log(res.data);
            navigate("/home");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <div>
            <Navbar />
                <header className="py-5">
                    <div className="container px-lg-5">
                        <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
                            <div className="m-4 m-lg-5">
                                <h1 className="display-5 fw-bold">Welcome, {user.firstName} {user.lastName}!</h1>
                                <p className="fs-4">Your Personal Workouts Are Below:</p>
                            </div>
                        </div>
                    </div>
                </header>
                {
                        workoutList?
                        <table class="table">
                        {
                            workoutList.map((workout, index)=>(
                                <div key={index}>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Workout Type</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Calories Burnt (Est.)</th>
                                            <th scope="col">Options</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{workout.name}</td>
                                            <td>{workout.date}</td>
                                            <td>{workout.type}</td>
                                            <td>{workout.duration}</td>
                                            <td>{workout.caloriesBurnt}</td>
                                            <td>{workout.date}</td>
                                            <td><Link className="btn btn-primary btn-lg" to={`/workouts/${workout._id}/update`}>Edit</Link></td>
                                            <td onClick={(e) => deleteWorkout(workout._id)} className="btn btn-primary btn-lg" style={{margin: '20px'}}>Delete</td>
                                        </tr>
                                    </tbody>
                                </div>
                            ))
                        }
                        </table>
                        :null
                    }

                    
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
                <script src="js/scripts.js"></script>
                </div>

    )
}

export default AllWorkouts;