import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";

export const ChoosePhase = () => {
    const { id2 } = useParams();
    const navigate = useNavigate();
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

    const VotingButton = ({id}) => {
        return (
            <button className="btn btn-primary" onClick={() => navigate(`${id}`)}>Głosuj</button>
        )
    }

    return (
        <>
            <h1>Wybierz etap</h1>
            <ul>
                {semifinals.length > 0 ? (
                    semifinals.map((semifinal) => (
                        <li key={semifinal.id}>
                            Półfinał {semifinal.count}
                            <VotingButton id={semifinal.id}/>
                        </li>
                    ))
                ) : (
                    <li>Brak etapów</li>
                )}
                <li>
                    Finał
                    <VotingButton id={final?.id}/>
                </li>
            </ul>
        </>
    );
}