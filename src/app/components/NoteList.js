import "./NoteList.css"
import StickyNote from "./StickyNote"
import NoteAdd from "./NoteAdd";
import { handleClientScriptLoad } from "next/script";

export default function NoteList ({notes, handleSave, handleDelete, handleComplete}) {

    return <div className="noteList">
        <NoteAdd handleSave={handleSave}/>
        <p>{notes.note}</p>
        {notes.map((note) => {
            return <StickyNote 
                key={note.index}
                index={note.index} 
                text={note.text} 
                date={note.date} 
                complete={note.complete}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
            />;
        })}
    </div>
}