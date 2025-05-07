import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { ConfirmButton } from "../components/ConfirmButton";
import { UnderlineNav } from "../components/UnderlineNav";
//import { LinkButton } from "../components/LinkButton";

export const ContestSettings = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});

    const navigate = useNavigate();

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

    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const data = {
                name: contest.name,
                logo: contest.logo
            }
            console.log(data);
            const response = await axios.put(`${ApiURL}/contests/${id}/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                  }
            });
            console.log(response);
           if (response.status === 200)
            {
                navigate("");
                alert("Udało się edytować konkurs!");
            }
        }
        catch (err) {
            alert("Coś poszło nie tak");
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setContest({
            ...contest,
            [e.target.name]: value
        });
    };

    const handleChangeLogo = (e) => {
        const file = e.target.files[0];
        setContest({
            ...contest,
            [e.target.name]: file
        });
    };

    return (
        <>
            <UnderlineNav page="ustawienia" link_idx={2}/>
            <h1>Ustawienia</h1>
            <form className="w-25" onSubmit={handleEdit}>
                <div className="mb-3"><input className="form-control border border-primary" name="name" value={contest.name} onChange={handleChange}/></div>
                <div className="mb-3"><input className="form-control border border-primary" type="file" name="logo" alt="logo" accept="image/*" onChange={handleChangeLogo}/></div>
                <ConfirmButton label={"Zatwierdź"}/>
            </form>
        </>
    );
}