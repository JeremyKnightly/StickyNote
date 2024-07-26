import React from "react"
import "./Header.css"

export default function Header({isDarkMode,handlePrintAll}) {

    return (<div className="headHolder">
        <h1 className="header">StickyNotes™</h1>
        <div className="buttonHolder">
            <button 
            className="toggleButton" 
            onClick={handlePrintAll}>Print PDF</button>
            <button 
            className="toggleButton" 
            onClick={
                ()=>isDarkMode( 
                    (previousDarkMode)=>(!previousDarkMode)
                )}>Toggle Dark Mode</button>
        </div>
    </div>);
}