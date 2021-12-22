import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

const NewWorkout = (props)=>{
    const [errors, setErrors] = useState({});

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState(false);
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [caloriesBurnt,setCaloriesBurnt] = useState("");

    const {id} = props;

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/workouts/${id}`)
            .then((res)=>{
                console.log(res.data);
                setName(res.data.name);
                setDate(res.data.date);
                setType(res.data.type);
                setDescription(res.data.description);
                setDuration(res.data.duration);
                setCaloriesBurnt(res.data.caloriesBurnt);
            })
            .catch((err)=>{
                console.log(err);
            })
        },[])

    const submitHandler = (e)=>{
        e.preventDefault();
        axios
            .put(
                `http://localhost:8000/api/workouts/${id}/update`,
                {
                    name,
                    date,
                    type,
                    description,
                    duration,
                    caloriesBurnt,
                    id
                },
                { withCredentials: true },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                const userid = localStorage.getItem("userid")
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
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        type="text"
                    />
                    <br />
                    {errors.name ? <span>{errors.name.message}</span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        name="date"
                        type="date"
                    />
                    <br />
                    {errors.date ? <span>{errors.date.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="description">description</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        type="text"
                    />
                    <br />
                    {errors.description ? <span>{errors.description.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="duration">duration</label>
                    <input
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        name="duration"
                        type="number"
                    />
                    <br />
                    {errors.duration ? <span>{errors.duration.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <select
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
                <div>
                    <label htmlFor="caloriesBurnt">Calories Burnt</label>
                    <input
                        value={caloriesBurnt}
                        onChange={(e) => setCaloriesBurnt(e.target.value)}
                        name="caloriesBurnt"
                        type="number"
                        />
                    <br />
                    {errors.caloriesBurnt ? <span>{errors.caloriesBurnt.message}</span> : null}
                </div>
                <button>Update Workout</button>
            </form>
        </div>
    );
}

export default NewWorkout;