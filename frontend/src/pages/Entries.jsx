import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { CountryRepresentation } from "../components/CountryRepresentation";

export const Entries = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/entries`)
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
            <h1>Piosenki</h1>
            <UnderlineNav page={"piosenki"} link_idx={0}/>
            <ul>
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <li key={entry.id}>
                            {entry.country ? <CountryRepresentation country={entry.country}/> : null}
                            <p>{entry.artist} - {entry.title}</p>
                            <p><a href={entry.Youtube_URL}>Youtube</a></p>
                            <p><a href={entry.Spotify_URL}>Spotify</a></p>
                        </li>
                    ))
                ) : (
                    <li>Brak piosenek</li>
                )}
            </ul>
        </>
    );
}