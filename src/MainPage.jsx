import React from "react";

function MainPage() {
    return (
        <div className="main-page">
            <div className="heading">
                <h1>MOVIE</h1>
            </div>
            <div className="search-area">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="search-button">
                    <button className="btn search-btn">Search</button>
                </div>
            </div>
            <div className="container">
                <div className="movies">

                </div>
                <div className="favourite-area">
                    <div className="favourite-list">

                    </div>
                    <div className="control">
                        <input type="text" />
                        <button className="btn add-btn">Add to Favourite List</button>
                        <button className="btn look-btn">Look at Favourite List</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;