import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { ConfirmButton } from "../components/ConfirmButton";

export const EditEdition = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [edition, setEdition] = useState({});

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/`)
        .then(response => {
            console.log(response);
            setEdition(response.data);
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
            <h1>Edycja {edition.count}</h1>
            <UnderlineNav page={"edytuj"} link_idx={1}/>
            <div className="w-50 mt-3">
                <div className="mb-3">
                    <label className="form-label">Data rozpoczęcia rezerwacji państw</label>
                    <input className="form-control border border-primary" type="datetime-local" value={'2001-01-01 19:00'}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data zakończenia rezerwacji państw</label>
                    <input className="form-control border border-primary" type="datetime-local" value={'2001-01-01 19:00'}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data rozpoczęcia wysyłania utworów</label>
                    <input className="form-control border border-primary" type="datetime-local" value={'2001-01-01 19:00'}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data zakończenia wysyłania utworów</label>
                    <input className="form-control border border-primary" type="datetime-local" value={'2001-01-01 19:00'}/>
                </div>
            </div>
            <ConfirmButton label={"Zatwierdź"}/>
        </>
    );
}