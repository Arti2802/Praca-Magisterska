import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { ConfirmButton } from "../components/ConfirmButton";
import { CountryRepresentation } from "../components/CountryRepresentation";

export const SetSemifinals = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    //const [edition, setEdition] = useState({});
    const [entries, setEntries] = useState([]);
    const [semifinals, setSemifinals] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/entries/`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
            axios.get(`${ApiURL}/editions/${id2}/semifinals/`)
            .then(response => {
                console.log(response);
                setSemifinals(response.data);
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

    return (
        <>
            <h1>Przydziel piosenki do półfinałów</h1>
            <UnderlineNav page={"ustal-polfinaly"} link_idx={1}/>
            <div>
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <div key={entry.id}>
                            <CountryRepresentation country={entry.country.country}/>
                            <span> {entry.artist} - {entry.title}</span>
                            <select defaultValue={0}>
                                <option value={0} disabled>Wybierz półfinał</option>
                                {semifinals.length > 0 ? (
                                    semifinals.map((semifinal) => (
                                        <option key={semifinal.id} value={semifinal.id}>Półfinał {semifinal.count}</option>
                                    ))
                                ) : null}
                            </select>
                        </div>
                    ))
                ) : (
                    <li>Brak państw</li>
                )}
            </div>
            <ConfirmButton label={"Zatwierdź"}/>
        </>
    );
}