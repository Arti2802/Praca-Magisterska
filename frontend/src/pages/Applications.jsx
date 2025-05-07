import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import toast from "react-hot-toast";

export const Applications = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/applications/`)
        .then(response => {
            console.log(response);
            setApplications(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    const handleChangeStatus = (id, accept) => {
        const data = {
            id: id,
            status: accept
        }
        axios.patch(`${ApiURL}/entries/${id}/`, data);
        toast.success('Zmieniono status zgłoszenia!');
    }

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
                            <button type="button" className="btn btn-link p-0" onClick={() => handleChangeStatus(application.id, 1)}>
                                <FcCheckmark className="icon"/>
                            </button>
                            <button type="button" className="btn btn-link p-0" onClick={() => handleChangeStatus(application.id, 0)}>
                                <FcCancel className="icon"/>
                            </button>
                        </li>
                    ))
                ) : (
                    <li>Brak piosenek</li>
                )}
            </ul>
        </>
    );
}