import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchArea from "../components/SearchArea";
import MovieCard from "../components/MovieCard";
import FavouriteMovie from "../components/FavouriteMovie";
import ControlArea from "../components/ControlArea";
import "../style.css";

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
            <Header />
            <SearchArea searchValue={search} onSearchChange={setSearch} onSearchSubmit={searchMovies} />
            <div className="container">
                <div className="movies">
                    {
                        movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} onAdd={addToFavourites} />
                        ))
                    }
                </div>
                <div className="favourite-area">
                    <div className="favourite-list">
                        {
                            favourites.map((favourite) => (
                                <FavouriteMovie key={favourite.imdbID} favourite={favourite} 
                                    removeFavourite={removeFavourite} />
                            ))
                        }
                    </div>
                    <ControlArea listName={listName} setListName={setListName} favouritesCount={favourites.length} 
                        saveList={saveList} hasSavedLists={hasSavedLists} />
                </div>
            </div>
        </div>
    );
}