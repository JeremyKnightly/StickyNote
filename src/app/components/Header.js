import React from "react"
import "./Header.css"

export default function Header({isDarkMode}) {

    return (<div className="headHolder">
        <h1 className="header">StickyNotes™</h1>
        <button 
        className="toggleButton" 
        onClick={
            ()=>isDarkMode( 
                (previousDarkMode)=>(!previousDarkMode)
            )}>Toggle Dark Mode</button>
    </div>);
}