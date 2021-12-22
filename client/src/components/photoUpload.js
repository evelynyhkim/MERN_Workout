import React, {useState, useEffect} from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const PhotoUpload = (props) => {
    const { userID } = props;
    const [selectedUser, setSelectedUser] = useState({
        beforePicture: '',
        afterPicture: ''
    });

    const [beforePic, setBeforePic] = useState([]);
    const [afterPic, setAfterPic] = useState([]);
    const [errors, setErrors] = useState('');  

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userID}`)
            .then((res) => {                
                setSelectedUser(res.data);
                //console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();        
        
        //Send the data
        sendData(e.target.name);      
    }

    const sendData = (name) => {       

        axios.put(`http://localhost:8000/api/users/${userID}/update`, selectedUser, { withCredentials: true })  //api/users/:id/update
        .then((res) => {                           
            fileUpload(name);              
        })

    }

    const fileUpload = (name) => {        

        const formData = new FormData(); 
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }; 

        let fileNames = [];         

        if ( name === "before" ) {
            fileNames.push(selectedUser.beforePicture);           
            formData.append(fileNames[0], beforePic[0]);                                              
        }
        else {
            fileNames.push(selectedUser.afterPicture);        
            formData.append(fileNames[0], afterPic[0]);                      
        }

        const postUrl = 'http://localhost:8000/api/upload/'

        axios.post(postUrl, formData, config)
        .then((res)=>{               
            navigate(`/user/profile/${userID}`)  //Doesn't do anything.             
        })
        .catch((err)=>{
            console.log(err);
        });        
        
    }
   

    const changeHandler = (e) => {
        const newState = {...selectedUser};
        newState[e.target.name] = userID + e.target.value.replace(/^.*[\\\/]/, ''); 
        setSelectedUser(newState);    
        
        if ( e.target.name === "beforePicture" ) {
            setBeforePic(e.target.files);
        }
        else {
            setAfterPic(e.target.files);
        }
    }

    // File upload function
    return(
        <div>
            <form name="before" onSubmit={submitHandler}>
                <label htmlFor="beforePhoto">Upload your Before Photo here:</label>
                <input type="file" name="beforePicture" onChange={changeHandler} />
                <input type="submit" name="uploadBefore" value="Upload"/>
            </form>
            <br/>
            <br/>
            <form name="after" onSubmit={submitHandler}>
                <label htmlFor="afterPhoto">Upload your After Photo here: </label>
                <input type="file" name="afterPicture" onChange={changeHandler}/>
                <input type="submit" name="uploadAfter" value="Upload" />
            </form>
        </div>
    )
}
export default PhotoUpload