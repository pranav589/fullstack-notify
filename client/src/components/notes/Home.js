import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("/notes", {
      headers: { Authorization: token },
    });

    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="note-wrapper">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <h4 title={note.title}>{note.title}</h4>
          <div className="text-wrapper">
            <p>{note.content}</p>
          </div>
          <div className="card-footer">
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
          </div>
          <button className="close" onClick={() => deleteNote(note._id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}
