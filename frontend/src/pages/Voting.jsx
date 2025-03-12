import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { ConfirmButton } from "../components/ConfirmButton";

export const Voting = () => {
    const { id2 } = useParams();
    const [entries, setEntries] = useState([]);
    const points = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/entries/`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])
    return (
        <>
            <h1>Głosowanie</h1>
            <ul>
                {entries.length > 0 ? (
                    entries.map((entry, idx) => (
                        <li key={entry.id}>
                            {entry.artist} - {entry.title} {points.at(idx)}
                        </li>
                    ))
                ) : (
                    <li>Żadna piosenka nie została jeszcze dodana</li>
                )} 
            </ul>
            <ConfirmButton label="Zagłosuj"/>
        </>
    );
}