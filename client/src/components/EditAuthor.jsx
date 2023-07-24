import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditAuthor = ({allAuthors, setAllAuthors}) => {
    const {id} = useParams();
    const [name, setName] = useState("");

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        if(id !== undefined){
            const targetAuthor = allAuthors.find(author => author._id === id);
            setName(targetAuthor.name);
        }
    },[])

    const AuthorHandler = (e) => {
        e.preventDefault();
        const newAuthor = {name};
        axios.post(`http://127.0.0.1:8000/api/authors`, newAuthor)
        .then(res => {
            setAllAuthors([...allAuthors, res.data]);
            navigate("/");
        })
        .catch(err => {
            const errArray = [];
            // console.log(err);
            for(const key of Object.keys(err.response.data.errors)){ 
                errArray.push(err.response.data.errors[key].message);
            }
            console.log(errArray);
            setErrors(errArray);
        });
    }

    return(
        <form onSubmit={e => AuthorHandler(e)}>
            <div className="errors" style={{color: "red"}}>
                {errors.map((err,idx) => {
                    return(
                        <p key={idx}>{err}</p>
                    );
                })}
            </div>
            <Link to="/authors">Home</Link>
            <h3>{id !== undefined ? "Edit" : "Add"} Author</h3>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <Link className="btn btn-danger" to="/authors">Cancel</Link>
                <button className="btn btn-dark">Submit</button>
            </div>
        </form>
    );
}

export default EditAuthor;