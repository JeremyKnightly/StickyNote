"use client"

import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { nanoid } from "nanoid";


export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  //const [localStorage, setLocalStorage] = useState();
  const [notes, setNotes] = useState([]);

  function addNote(text) {
    const date = new Date();
    const id = nanoid();
    const newNotes= [
      {index: id,
      key: id,
      text: text,
      date: date.toLocaleDateString(),
      complete: false,
      }
      ,...notes
      ];
    setNotes(newNotes);
  }

  function deleteNote (index) {
    const newNotes = notes.filter((note) => note.index !== index);
    setNotes(newNotes);
  }

  function completeNote (index) {
    const modifiedNotes = notes.map((note) => 
      note.index === index ? 
      {...note, complete: !note.complete}:
      note
    );

    setNotes(modifiedNotes);
  }

  function saveNote (text) {
    addNote(text);
  }



  useEffect(() =>{
    console.log(JSON.stringify(notes));

      const savedNotes = JSON.parse(
        localStorage.getItem('react-sticky-notes-app-data')
      );

      if (savedNotes) {
        console.log("load successful:" + JSON.stringify(savedNotes));
        setNotes(savedNotes);
      }

  },[]);

  useEffect(() => {
    console.log("load successful:" + JSON.stringify(notes));
    localStorage.setItem(
      'react-sticky-notes-app-data', 
      JSON.stringify(notes)
    );
    console.log("Save successful:" + JSON.stringify(notes));
  },[notes]);

  return (
    <div className={`${isDarkMode && "darkMode"}`}> 
      <div className="container">
        <Header isDarkMode={setIsDarkMode}/>
        <SearchBar searchParam={setSearchParam}/>
        <NoteList 
          notes={notes.filter((note)=>note.text.toUpperCase().includes(searchParam.toUpperCase()))} 
          handleSave={saveNote} 
          handleDelete={deleteNote}
          handleComplete={completeNote}
        />
      </div>
    </div>
  );
}
