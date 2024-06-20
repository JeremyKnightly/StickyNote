import "./SearchBar.css"
import { useState } from "react"
import {BsSearch} from 'react-icons/bs'

export default function SearchBar ({searchParam}) {

    return <div className="searchContainer"><BsSearch size="1.2em"></BsSearch>
        <input 
            type="text"
            className="searchBar"
            maxLength="100" 
            placeholder="Search..." 
            rows="1" 
            onChange={(e)=>searchParam(e.target.value)}/>
    </div>
}