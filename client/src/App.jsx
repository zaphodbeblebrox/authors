import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home';
import { useEffect, useState } from 'react';
import axios from "axios";
import EditAuthor from './components/EditAuthor';


function App() {
  const [allAuthors, setAllAuthors] = useState([]);

  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/authors")
          .then(res => setAllAuthors(res.data))
          .catch(err => console.log(err));
  }, [])

  return (
    <BrowserRouter Router >
      <div className="App" >
        <Routes>
          <Route path="/" element={<Navigate to="/authors" />}/>
          <Route path="/authors/" element={<Home allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>} />
          <Route path="/authors/new" element={<EditAuthor allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>} />
          <Route path="/authors/edit/:id" element={<EditAuthor allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;