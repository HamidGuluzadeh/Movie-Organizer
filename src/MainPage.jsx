import React, { useEffect, useState } from "react";

export default function MainPage() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [listName, setListName] = useState("");
    const [savedListId, setSavedListId] = useState("");
    const [hasSavedLists, setHasSavedLists] = useState(false);

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem("myLists")) || [];

        if (lists.length > 0) {
            setHasSavedLists(true);
        }

        const defaultMovieIds = ["tt0111161", "tt0468569", "tt0109830"];
        const fetchedMovies = [];

        defaultMovieIds.map((id) => {
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=16b0c23c`)
            .then(response => response.json())
            .then(data => {
                if (data.Response == "True") {
                    fetchedMovies.push(data);
                    setMovies([...fetchedMovies]);
                }
            })
            .catch(error => {
                console.error("Error: ", error);
            });
        });
    },[]);

    const searchMovies = () => {
        if (!search.trim()) {
            return;
        }

        fetch(`http://www.omdbapi.com/?s=${search}&apikey=16b0c23c`)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const addToFavourites = (movie) => {
        const isAdded = favourites.find((favourite) => {
            return favourite.imdbID == movie.imdbID;
        });

        if (!isAdded) {
            setFavourites([...favourites, movie]);
        }
    }

    const removeFavourite = (id) => {
        const filtered = favourites.filter((favourite) => {
            return favourite.imdbID != id;
        });

        setFavourites(filtered);
    }
    
    const saveList = () => {
        const movieIds = favourites.map(favourite => favourite.imdbID);

        fetch("https://acb-api.algoritmika.org/api/movies/list", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title: listName,
                movies: movieIds
            })
        })
        .then(response => response.json())
        .then(data => {
            setSavedListId(data.id);

            const allLists = JSON.parse(localStorage.getItem("myLists")) || [];
            allLists.push({ id: data.id, title: listName, movies: favourites });

            localStorage.setItem("myLists", JSON.stringify(allLists));

            setHasSavedLists(true);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    return (
        <div className="main-page">
            <div className="heading">
                <h1>MOVIE</h1>
            </div>
            <div className="search-area">
                <div className="search-bar">
                    <input type="text" value={search} placeholder="Search" 
                        onChange={(event) => setSearch(event.target.value)} />
                </div>
                <div className="search-button">
                    <button className="btn search-btn" onClick={searchMovies}>Search</button>
                </div>
            </div>
            <div className="container">
                <div className="movies">
                    {
                        movies.map((movie) => (
                            <div className="movie-card" key={movie.imdbID}>
                                <div className="movie-poster">
                                    <img src={movie.Poster} alt={movie.Title} />
                                </div>
                                <div className="movie-info">
                                    <h2>{movie.Title}</h2>
                                    <p>Year: {movie.Year}</p>
                                    <button className="btn fav-btn" onClick={() => addToFavourites(movie)}>
                                        + Favourite
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="favourite-area">
                    <div className="favourite-list">
                        {
                            favourites.map((fav) => (
                                <div className="favourite-item" key={fav.imdbID}>
                                    <div>{fav.Title}</div>
                                    <button className="btn remove-btn" onClick={() => removeFavourite(fav.imdbID)}>
                                        <img src="./src/assets/54473.png" alt="Remove" />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <div className="control">
                        <input type="text" onChange={(event) => setListName(event.target.value)} />
                        <button className="btn add-btn" disabled={favourites.length == 0 || !listName.trim()} 
                            onClick={saveList}>
                                Add to Favourite List
                        </button>
                        <button className="btn look-btn" disabled={!hasSavedLists}
                            onClick={() => window.location.href = `/list`}>
                                Look at Favourite List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}