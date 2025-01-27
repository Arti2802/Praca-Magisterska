import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ApiURL from "../ApiURL";

export const Home = () => {
    const [contests, setContests] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/contests/`)
        .then(response => {
            console.log(response);
            setContests(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [])
    return (
        <>
            <form>
                <a href="/dodaj-konkurs"><button type="button">Stwórz konkurs</button></a>
            </form>
            <h1>Konkursy</h1>
            {contests.map((contest) => (
                <a href={`${contest.id}`}><p key={contest.id}>{contest.name}</p></a>
            ))}
        </>
    );
}