import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { PhaseWithRunningOrder } from "../components/PhaseWithRunningOrder";

export const RunningOrder = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [semifinals, setSemifinals] = useState([]);
    const [final, setFinal] = useState({});

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/semifinals/`)
        .then(response => {
            console.log(response);
            setSemifinals(response.data);
            axios.get(`${ApiURL}/editions/${id2}/`)
            .then(response => {
                console.log(response);
                setFinal(response.data.final);
            })
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    return (
        <>
            <h1>Kolejność występów</h1>
            <UnderlineNav page={"kolejnosc-wystepow"} link_idx={0}/>
            <ul>
                {semifinals.length > 0 ? (
                    semifinals.map((semifinal) => (
                        <li key={semifinal.id}>
                            <h2>Półfinał {semifinal.count}</h2>
                            <PhaseWithRunningOrder id={semifinal.id}/>
                        </li>
                    ))
                ) : (
                    null
                )}
                <li>
                    <h2>Finał</h2>
                    <PhaseWithRunningOrder id={final?.id}/>
                </li>
            </ul>
        </>
    );
}