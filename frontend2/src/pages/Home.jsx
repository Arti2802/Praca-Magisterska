import axios from "axios";
import React from "react";
import { useEffect } from "react";

export const Home = () => {
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/contests/')
        .then(response => {
            console.log(response);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [])
    return (
        <h1>Strona główna</h1>
    );
}