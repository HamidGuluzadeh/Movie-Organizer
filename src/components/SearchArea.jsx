import React from "react";
import "../style.css";

export default function Search({ searchValue, onSearchChange, onSearchSubmit }) {
    return (
        <div className="search-area">
            <div className="search-bar">
                <input type="text" value={searchValue} placeholder="Search" 
                    onChange={(event) => onSearchChange(event.target.value)} />
            </div>
            <div className="search-button">
                <button className="btn search-btn" onClick={onSearchSubmit}>Search</button>
            </div>
        </div>
    );
}