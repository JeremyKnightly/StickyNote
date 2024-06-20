"use client"

import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";


export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const localStorage = typeof window !== "undefined" ? window.localStorage : null;
  const [notes, setNotes] = useState(
    localStorage.getItem('react-sticky-notes-app-data') ? 
    JSON.parse(localStorage.getItem('react-sticky-notes-app-data')) 
    : []
  );

  function addNote(text) {
    const date = new Date();
    const id = nanoid();
    const newNotes= [
      {index: id,
      key: id,
      text: text,
      date: date.toLocaleDateString(),
      }
      ,...notes
      ];
    setNotes(newNotes);
  }

  function deleteNote (index) {
    const newNotes = notes.filter((note) => note.index !== index);
    setNotes(newNotes);
  }

  function saveNote (text) {
    addNote(text);
  }

  useEffect(() => {
    localStorage.setItem(
      'react-sticky-notes-app-data', 
      JSON.stringify(notes)
    );
  },[notes]);

  return (
    <div className={`${isDarkMode && "darkMode"}`}> 
      <Analytics />
      <div className="container">
        <Header isDarkMode={setIsDarkMode}/>
        <SearchBar searchParam={setSearchParam}/>
        <NoteList 
          notes={notes.filter((note)=>note.text.toUpperCase().includes(searchParam.toUpperCase()))} 
          handleSave={saveNote} 
          handleDelete={deleteNote}
        />
      </div>
    </div>
  );
}
