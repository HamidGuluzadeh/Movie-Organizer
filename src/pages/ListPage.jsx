import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SavedListCard from "../components/SavedListCard";
import "../style.css";

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
            <Header />
            <div className="container">
                <div className="lists-area">
                    {
                        allLists.map((list,index) => (
                            <SavedListCard list={list} deleteList={deleteList} index={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}