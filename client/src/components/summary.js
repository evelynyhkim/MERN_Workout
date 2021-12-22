import React, {useEffect, useState} from "react";
import axios from "axios";

const Summary = (props) => {
    const {id} = props;
    const [workout, setWorkout] = useState({});

    useEffect(() => {
        axios.get(`http://linuxhome:8000/api/workouts/${id}`)
            .then((res) => {
                console.log(res.data);
                setWorkout(res.data);
            })
            .catch((err) => console.log(err));
    }, [])

    return(
        <div>
            {/* Nav component */}
            <h1>Workout Summary</h1>
            <h2>{ workout.name } on { workout.date }</h2>
            <p>Description: {workout.description} </p>
            <p>Workout Type: {workout.type}</p>
            <p>Duration: {workout.duration}</p>
            <p>Est. kCal burnt: {workout.caloriesBurnt}</p>
        </div>
    )
}
export default Summary;