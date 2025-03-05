import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";

export const Voting = () => {
    const { id } = useParams();
    //const [contest, setContest] = useState({});
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id}/entries/`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])
    return (
        <>
            <h1>Głosowanie</h1>
            <ul>
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <li key={entry.id}>
                            {entry.artist} - {entry.title}
                        </li>
                    ))
                ) : (
                    <li>Żadna edycja jeszcze się nie odbyła</li>
                )} 
            </ul>
            <button className="btn btn-success">Zagłosuj</button>
        </>
    );
}