import React from "react";
import "../style.css";

export default function FavouriteMovie({ favourite, removeFavourite }) {
    return (
        <div className="favourite-item" key={favourite.imdbID}>
            <div>{favourite.Title}</div>
            <button className="btn remove-btn" onClick={() => removeFavourite(favourite.imdbID)}>
                <img src="./src/assets/54473.png" alt="Remove" />
            </button>
        </div>
    );
}