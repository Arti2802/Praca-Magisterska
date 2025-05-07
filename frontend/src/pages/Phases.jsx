import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { dateFormat } from "../components/dateFormat";

export const Phases = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [semifinals, setSemifinals] = useState([]);
    const [final, setFinal] = useState({});

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/semifinals/`)
        .then(response => {
            console.log(response);
            setSemifinals(response.data);
            axios.get(`${ApiURL}/editions/${id2}`)
            .then(response => {
                console.log(response);
                setFinal(response.data.final);
            })
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     setData({
    //         ...data,
    //         [e.target.name]: value
    //     });
    // };

    const showDate = (date) => {
            return date ? dateFormat(date) : <i>Brak informacji</i>
    }

    return (
        <>
            <h1>Etapy</h1>
            <UnderlineNav page={"etapy"} link_idx={1}/>
            <a href={`nowy-polfinal`}><button className="btn btn-primary">Nowy półfinał</button></a>
            <ul>
                {semifinals.length > 0 ? (
                    semifinals.map((semifinal) => (
                        <li key={semifinal.id}>
                            <a href={`etapy/${semifinal.id}`}>Półfinał {semifinal.count}</a>
                            <p></p>
                            <b>Data rozpoczęcia głosowania</b>
                            <p>{showDate(semifinal.voting_start_date)}</p>
                            <b>Data zakończenia głosowania</b>
                            <p>{showDate(semifinal.voting_end_date)}</p>
                            <b>Wyniki</b>
                            <p>{showDate(semifinal.results_date)}</p>
                        </li>
                    ))
                ) : (
                    <li>Brak etapów</li>
                )}
                {final ? (
                    <li>
                        <a href={`etapy/${final.id}`}>Finał</a>
                        <p></p>
                            <b>Data rozpoczęcia głosowania</b>
                            <p>{showDate(final.voting_start_date)}</p>
                            <b>Data zakończenia głosowania</b>
                            <p>{showDate(final.voting_end_date)}</p>
                            <b>Wyniki</b>
                            <p>{showDate(final.results_date)}</p>
                    </li>
                ) : null}
            </ul>
        </>
    );
}