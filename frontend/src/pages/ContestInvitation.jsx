import React from "react";
import axios from "axios";
import ApiURL from "../ApiURL";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ContestInvitation = () => {
    const { key } = useParams();
    const id = key;
    const [contest, setContest] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/`)
        .then(response => {
            setContest(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/users/${sessionStorage.getItem('id')}/`)
        .then(response => {
            if (response.data.length > 0)
            {
                if (response.data[0].banned)
                {
                    toast.error('Zostałeś zbanowany na tym serwerze!');
                    navigate('/');
                }
                else
                {
                    navigate(`/konkursy/${id}`);
                }
            }
        })
        .catch((errors) => {
            console.log(errors);
        })
    }, [id, navigate])

    const handleJoin = async(e) => {
        e.preventDefault();
        const data = {
            user: sessionStorage.getItem('id'),
            contest: key
        }
        try {
            console.log(data);
            const response = await axios.post(`${ApiURL}/usersincontests/`, data);
            console.log(response);
            if (response.status === 201)
            {
                navigate(`/konkursy/${id}`);
            }
        } catch (err) {
            console.log(err);
            if (!err.response) {
                toast.error('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                toast.error("Coś poszło nie tak");
            } else if (err.response?.status === 401){
                toast.error('Brak autoryzacji');
            } else {
                toast.error('Coś poszło nie tak');
            }
        }
    }

    const handleReject = () => {
        navigate('/');
    }

    return (
        <div className="row align-items-center justify-content-md-center m-5">
            <div className="col-4 border border-primary rounded-2 bg-primary-subtle text-primary-emphasis py-4 px-2">
                <h2 className="text-center">Otrzymałeś zaproszenie na konkurs {contest.name}</h2>
                <div className="px-5">
                    <button className="btn btn-success float-start" onClick={handleJoin}>Dołącz</button>
                    <button className="btn btn-danger float-end" onClick={handleReject}>Odrzuć</button>
                </div>
            </div>
        </div>
    );
}