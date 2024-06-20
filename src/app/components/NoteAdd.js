import { act, useState } from "react";
import "./StickyNote.css"
import {BiSolidSave} from 'react-icons/bi'

export default function NoteAdd ( {handleSave} ) {
    const maxCharCount = 165;
    const [activeText, setActiveText] = useState("");

    const handleSaveClick = () => {
        if(activeText.trim().length > 0){
            handleSave(activeText);
            setActiveText("");
        }
    }

    const handleTextChange = (e) => {
            setActiveText(e.target.value);
    }

    return (<div className="stickyNote blue">
        <textarea 
            maxLength={maxCharCount}
            className="inputArea blue" 
            rows="8" cols="10" 
            placeholder="Type to add a note..." 
            value={activeText}
            onChange={handleTextChange}>
        </textarea>
        <div className="footer">
            <small className="info">{maxCharCount-activeText.length} Remaining</small>
            <button onClick={handleSaveClick}><BiSolidSave size='1.2em'/></button>
        </div>
    </div>);
}