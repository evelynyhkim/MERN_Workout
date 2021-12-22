import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import axios from "axios";
import moment from 'moment';

const Summary = (props) => {
    const {id} = props;
    const [workout, setWorkout] = useState({});

    useEffect(() => {
        axios.get(`http://linuxhome:8000/api/workouts/${id}`)
            .then((res) => {                
                setWorkout(res.data);
            })
            .catch((err) => console.log(err));
    }, [])
    //moment().format('MMMM Do YYYY, h:mm:ss a'); // December 22nd 2021, 4:32:49 pm
    return(
        <div>            
            <Navbar id={id}/>
            <div className="container-md mt-3 d-flex justify-content-center">
                <div>
                    <h1 className="mt-3">Workout Summary</h1>
                    <h2 className="text-start mt-3 fs-2">{ workout.name } on { moment(workout.date).format('MMMM Do YYYY')}</h2> 
                    <p className="text-start fs-2">Description: {workout.description} </p>
                    <p className="text-start fs-2">Workout Type: {workout.type}</p>
                    <p className="text-start fs-2">Duration: {workout.duration}</p>
                    <p className="text-start fs-2">Est. kCal burnt: {workout.caloriesBurnt}</p>
                </div>
            </div>
        </div>
    )
}
export default Summary; 