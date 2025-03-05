import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { LinkButton } from "../components/LinkButton";

export const Contest = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});
    const [editions, setEditions] = useState([]);

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

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/editions/`)
        .then(response => {
            console.log(response);
            setEditions(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])
    return (
        <>
            <h1>{contest.name}</h1>
            <div className="btn-group">
                <LinkButton id={id} link="rezerwacja-panstw" label="Zarezerwuj państwo"/>
                <LinkButton id={id} link="zglaszanie-piosenki" label="Zgłoś piosenkę"/>
                <LinkButton id={id} link="glosowanie" label="Zagłosuj"/>
            </div>
            <p>Regulamin</p>
            <p>Czat</p>
            <p>Edycje</p>
            <ul>
                {editions.length > 0 ? (
                    editions.map((edition) => (
                        <li key={edition.id}>
                            {edition.count}
                        </li>
                    ))
                ) : (
                    <li>Żadna edycja jeszcze się nie odbyła</li>
                )} 
            </ul>
        </>
    );
}