import React from "react";
import "../style.css";

export default function SavedListCard({ list, deleteList, index }) {
    return (
        <div key={index} className="list-zone">
            <div className="list-box">
                <div className="list-header">
                    <h2 className="title">{list.title}</h2>
                </div>
                <div className="saved-movies">
                    {
                        list.movies.map((movie) => (
                            <div key={movie.imdbID} className="saved-movie">
                                <h3 className="movie-title">{movie.Title}</h3>
                                <a href={`https://www.imdb.com/title/${movie.imdbID}/`}
                                    target="_blank">
                                    <button className="btn link-btn">IMDB</button>
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button className="btn remove-btn" onClick={() => deleteList(index)}>
                <img src="./src/assets/red-x-icon.svg" alt="Remove" />
            </button>
        </div>
    );
}