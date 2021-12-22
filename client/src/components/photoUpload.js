import React, {useState, useEffect} from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const PhotoUpload = (props) => {
    const {id} = props;
    const [selectedUser, setSelectedUser] = useState({
        beforePicture: "",
        afterPicture: ""
    });
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then((res) => {
                console.log(res.data);
                setSelectedUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/${id}/update`, selectedUser)
            .then((res) => {
                console.log(res.data)
                /*file upload */
                navigate(`/users/profile/${id}`)
            })
    }
    const [errors, setErrors] = useState('');
    // File upload function
    return(
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="beforePhoto">Upload your Before Photo here:</label>
                <input type="file" name="beforePhoto"/>
                <input type="submit" value="Upload"/>
            </form>
            <br/>
            <br/>
            <form onSubmit={submitHandler}>
                <label htmlFor="afterPhoto">Upload your After Photo here: </label>
                <input type="file" name="afterPhoto"/>
                <input type="submit" value="Upload"/>
            </form>
        </div>
    )
}
export default PhotoUpload