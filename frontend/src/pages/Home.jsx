import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiURL from "../ApiURL";

export const Home = () => {
    const [contests, setContests] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/users/${sessionStorage.getItem('id')}/contests/`)
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
                <a href="/dodaj-konkurs"><button className="btn btn-primary" type="button">Stwórz konkurs</button></a>
            </form>
            <h1>Konkursy</h1>

            <div className="container">
                <div className="row row-cols-3 gx-6 row-gap-3">
                    {contests.map((contest) => (
                        <div className="col text-center hovered" data-mdb-ripple-init data-mdb-ripple-color="dark" key={contest.id}>
                            <a className="list-group-item" href={`/konkursy/${contest.id}`}>
                                <div className="border border-primary rounded-2 bg-primary-subtle text-primary-emphasis">
                                    <h2 className="p-4">{contest.name}</h2>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}