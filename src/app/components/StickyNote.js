import "./StickyNote.css"
import {MdDeleteForever} from 'react-icons/md';


export default function StickyNote ( {index, text, date, handleDelete} ) {
    


    return (<div className="stickyNote">
        <p className="content">{ text }</p>
        <div className="footer">
            <small className="info">{ date }</small>
            <button onClick={()=>handleDelete(index)}>
                <MdDeleteForever className="deleteNote" size='1.2em'/>
            </button>
        </div>
    </div>);
}