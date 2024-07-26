import "./StickyNote.css"
import {MdDeleteForever} from 'react-icons/md';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FiCheckSquare } from "react-icons/fi";
import { MdPrint } from "react-icons/md";





export default function StickyNote ( {index, text, date, complete, handleDelete, handleComplete} ) {
    


    return (<div className="stickyNote">
        <div className="noteHead">
            <div>
                <MdPrint className="clickable" size='1.2em'/>
            </div>
            <div className="complete">
                <p>Completed{complete}</p>
                {complete ?
                <FiCheckSquare className="clickable" onClick={()=>handleComplete(index)} size='1.3em'/>:
                <MdOutlineCheckBoxOutlineBlank className="clickable" onClick={()=>handleComplete(index)} size='1.4em'/>
                }
            </div>

        </div>

        {complete ? 
        <p className="content strikeThrough">{ text }</p>:
        <p className="content">{ text }</p>
        }
        <div className="footer">
            <small className="info">{ date }</small>
            <button onClick={()=>handleDelete(index)}>
                <MdDeleteForever className="deleteNote" size='1.2em'/>
            </button>
        </div>
    </div>);
}