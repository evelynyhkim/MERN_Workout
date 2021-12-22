import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import Navbar from './Navbar';

const NewWorkout = (props)=>{
    const userid = localStorage.getItem("userid")
    const [errors, setErrors] = useState({});

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState(false);
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");    
    const [caloriesBurnt,setCaloriesBurnt] = useState("");
    
    const {id} = props;

    const submitHandler = (e)=>{
        e.preventDefault();
        axios
            .post(
                "http://linuxhome:8000/api/workouts/new",
                {
                    name,
                    date,
                    type,
                    description,
                    duration,
                    caloriesBurnt,
                    userid
                },
                { withCredentials: true },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                // const userid = localStorage.getItem("userid")
                navigate(`/user/profile/${userid}`);
            })
            .catch((err) => {
                console.log("err: ", err);
                console.log("err.response:", err.response);
                console.log("err.response.data:", err.response.data);
                setErrors(err.response.data.errors);
            });
    }
    
    return (
        <div>
            <Navbar id={id}/>
            <form onSubmit={submitHandler} style={{maxWidth: "600px",
                                                   marginRight: "auto",
                                                   marginLeft: "auto",
                                                   marginTop: "3em"                                            
                                            }}>
                <div className="form-group d-flex align-items-center">
                    <label className="form-label fs-4 me-3 flex-1 text-end" htmlFor="name">Name:</label>
                    <input
                        className="form-control flex-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        type="text"
                        
                    />
                    <br />
                    {errors.name ? <span>{errors.name.message}</span> : null}
                </div>
                <div className="form-group d-flex">
                    <label className="form-label fs-4 me-3 flex-1 text-end" htmlFor="date">Date:</label>
                    <input
                        className="form-control flex-3"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        name="date"
                        type="date"
                    />
                    <br />
                    {errors.date ? <span>{errors.date.message}</span> : null}
                </div>
                <div className="form-group d-flex">
                    <label className="form-label fs-4 me-3 flex-1 text-end" htmlFor="description">description:</label>
                    <textarea
                        className="form-control flex-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        type="text"
                    />
                    <br />
                    {errors.description ? <span>{errors.description.message}</span> : null}
                </div>
                <div className="form-group d-flex">
                    <label className="form-label fs-4 me-3 flex-1 text-end" htmlFor="duration">duration:</label>
                    <input
                        className="form-control flex-3"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        name="duration"
                        type="number"
                    />
                    <br />
                    {errors.duration ? <span>{errors.duration.message}</span> : null}
                </div>
                <div className="form-group d-flex">
                    <label className="form-label fs-4 me-4 flex-1 text-end" htmlFor="type">Type:</label>
                    <select 
                        className="form-select flex-3"                        
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        name="type"
                        >
                        <option value="none" defaultValue hidden>
                            What type of workout is it?
                        </option>
                        <option value="Cardio">Cardio</option>
                        <option value="Strength">Strength</option>
                        <option value="Flexibility">Flexibility</option>
                        <option value="Others">Other</option>
                    </select>
                    <br />
                    {errors.type ? <span>{errors.type.message}</span> : null}
                </div>
                <div className="form-group d-flex">
                    <label className="form-label fs-4 me-3 flex-1 text-end" htmlFor="caloriesBurnt">Calories Burnt:</label>
                    <input
                        className="form-control flex-3"
                        value={caloriesBurnt}
                        onChange={(e) => setCaloriesBurnt(e.target.value)}
                        name="caloriesBurnt"
                        type="number"
                        />
                    <br />
                    {errors.caloriesBurnt ? <span>{errors.caloriesBurnt.message}</span> : null}
                </div>
                <button className="btn btn-primary mt-3">Add New Workout</button>
            </form>
        </div>
    );
}

export default NewWorkout;