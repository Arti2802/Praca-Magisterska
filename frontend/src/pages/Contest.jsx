import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";

export const Contest = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});
    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/`)
        .then(response => {
            console.log(response);
            setContest(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])
    return (
        <>
            <h1>{contest.name}</h1>
            <p>Regulamin</p>
            <p>Czat</p>
            <p>Edycje</p>
        </>
    );
}