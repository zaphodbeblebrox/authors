import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Home = ({allAuthors, setAllAuthors}) => {

    const DeleteAuthorHandler = (e, authorId) => {
        e.preventDefault();
        useEffect(() => {
            axios.delete(`http://127.0.0.1:8000/api/authors/${authorId}`)
                .then(res => {
                    const updatedAuthors = [...allAuthors];
                    const idIndex = updatedAuthors.findIndex(author => author._id === authorId);
                    updatedAuthors.splice(idIndex, 1);
                    setAllAuthors(updatedAuthors);
                })
                .catch(err => console.log(err));
        }, [])
    }


    return(
        <div>
            <Link to="/authors/new">Add a author</Link>
            <h3>Authors</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allAuthors.map(author => {
                        return(
                            <tr key={author._id}>
                                <td>{author.name}</td>
                                <td className="d-flex flex-row justify-content-evenly">
                                    <Link to={`/authors/edit/${author._id}`}>Edit</Link>
                                    <p> | </p>
                                    <Link onClick={e => DeleteAuthorHandler(e, author._id)}>Delete</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default Home;