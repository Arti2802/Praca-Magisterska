import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { ConfirmButton } from "../components/ConfirmButton";
import { UnderlineNav } from "../components/UnderlineNav";
//import { LinkButton } from "../components/LinkButton";

export const ContestSettings = () => {
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
            <UnderlineNav page="ustawienia" link_idx={2}/>
            <h1>Ustawienia</h1>
            <form className="w-25">
                <div className="mb-3"><input className="form-control border border-primary" value={contest.name}/></div>
                <div className="mb-3"><input className="form-control border border-primary" type="file" alt="logo" accept="image/*"/></div>
                <ConfirmButton label={"Zatwierdź"}/>
            </form>
        </>
    );
}