import React, { useEffect, useState } from "react";

export default function ListPage() {
    const [allLists, setAllLists] = useState([]);

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem("myLists")) || [];
        setAllLists(lists);
    },[]);

    const deleteList = (listIndex) => {
        const newLists = allLists.filter((list,index) => {
            return index != listIndex;
        });

        setAllLists(newLists);

        localStorage.setItem("myLists", JSON.stringify(newLists));
    }

    return (
        <div className="list-page">
            <div className="heading">
                <h1>MOVIE</h1>
            </div>
            <div className="container">
                <div className="lists-area">
                    {
                        allLists.map((list,index) => (
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
                                                        <button className="btn link-btn">
                                                            IMDB
                                                        </button>
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
                        ))
                    }
                </div>
            </div>
        </div>
    );
}