import React from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function ControlArea({ 
    listName, 
    setListName, 
    favouritesCount, 
    saveList, 
    hasSavedLists 
}) {
    const navigate = useNavigate();

    return (
        <div className="control">
            <input type="text" value={listName} onChange={(event) => setListName(event.target.value)} />
            <button className="btn add-btn" disabled={favouritesCount == 0 || !listName.trim()} 
                onClick={saveList}>
                    Add to Favourite List
            </button>
            <button className="btn look-btn" disabled={!hasSavedLists}
                onClick={() => navigate("/list")}>
                    Look at Favourite List
            </button>
        </div>
    );
}