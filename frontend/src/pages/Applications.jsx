import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

export const Applications = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/entries/`)
        .then(response => {
            console.log(response);
            setApplications(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    return (
        <>
            <h1>Zgłoszenia piosenek</h1>
            <UnderlineNav page={"zgloszenia"} link_idx={1}/>
            <ul>
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <li key={application.id}>
                            <p>{application.artist} - {application.title}</p>
                            <p><a href={application.Youtube_URL}>Youtube</a></p>
                            <p><a href={application.Spotify_URL}>Spotify</a></p>
                            <p>{application.ts}</p>
                            <FcCheckmark className="icon2"/>
                            <FcCancel className="icon2"/>
                        </li>
                    ))
                ) : (
                    <li>Brak piosenek</li>
                )}
            </ul>
        </>
    );
}