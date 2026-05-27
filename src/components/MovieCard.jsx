import React from "react";
import "../style.css";

export default function MovieCard({ movie, onAdd }) {
    return (
        <div className="movie-card" key={movie.imdbID}>
            <div className="movie-poster">
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="movie-info">
                <h2>{movie.Title}</h2>
                <p>Year: {movie.Year}</p>
                <button className="btn fav-btn" onClick={() => onAdd(movie)}>
                    + Favourite
                </button>
            </div>
        </div>
    );
} 