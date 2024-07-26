"use client"

import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { nanoid } from "nanoid";
import { jsPDF } from "jspdf";


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

  async function printAllNotes () {
    try{
      const doc = new jsPDF();
      const margin = 15;
      const lineHeight = 12;
      const pageHeight = doc.internal.pageSize.height-margin*2;
      let yStart = margin;

      if (yStart + margin>pageHeight){
        doc.addPage();
        yStart = margin;
      }

      // Add notes to the PDF
      notes.forEach((note,index) => {
        doc.text(stringifyNote(note), 15, yStart);
        yStart += lineHeight*2;
      });

      handlePrintWindow(doc);

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }

  function stringifyNote(note) {
    return `--${note.date}--  ${note.text}  ${note.complete ? "--Completed--": "--Incomplete--"}`;
  }

  function handlePrintWindow(doc){
    const pdfBlob = doc.output('blob');

    const pdfUrl = URL.createObjectURL(pdfBlob);

    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
        URL.revokeObjectURL(pdfUrl);
      };
    }
  }
  
  async function printNote (index) {
    try{
      const doc = new jsPDF();
      const margin = 15;

      // Add note to the PDF
      notes.forEach((note) => {
        if (note.index === index){
          console.log("note found.");
          doc.text(stringifyNote(note), 15, margin);
        }
        console.log("note checked");
      });

      handlePrintWindow(doc);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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
        <Header isDarkMode={setIsDarkMode} handlePrintAll={printAllNotes}/>
        <SearchBar searchParam={setSearchParam}/>
        <NoteList 
          notes={notes.filter((note)=>note.text.toUpperCase().includes(searchParam.toUpperCase()))} 
          handleSave={saveNote} 
          handleDelete={deleteNote}
          handleComplete={completeNote}
          handlePrint={printNote}
        />
      </div>
    </div>
  );
}
