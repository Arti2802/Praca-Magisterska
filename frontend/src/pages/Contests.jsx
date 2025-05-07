import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
//import { LinkButton } from "../components/LinkButton";
import toast from "react-hot-toast";

export const Contests = () => {
    const { id } = useParams();
    const [contests, setContests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${ApiURL}/contests/`)
        .then(response => {
            console.log(response);
            setContests(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])

    const handleJoin = async(e, id) => {
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
            else
            {
                e.preventDefault();
                const data = {
                    user: sessionStorage.getItem('id'),
                    contest: id
                }
                console.log(data);
                axios.post(`${ApiURL}/usersincontests/`, data)
                .then(response => {
                    console.log(response);
                    if (response.status === 201)
                    {
                        navigate(`/konkursy/${id}`);
                    }
                })
                .catch(errors => {
                    console.log(errors);
                    if (!errors.response) {
                        toast.error('Brak odpowiedzi od serwera');
                    } else if (errors.response?.status === 400){
                        toast.error("Coś poszło nie tak");
                    } else if (errors.response?.status === 401){
                        toast.error('Brak autoryzacji');
                    } else {
                        toast.error('Coś poszło nie tak');
                    }
                })
            }
        })
        .catch((errors) => {
            console.log(errors);
        })

    }

    return (
        <>
            <h1>Dostępne konkursy</h1>
            <ul>
                {contests.length > 0 ? (
                    contests.map((contest) => (
                        <li key={contest.id}>
                            {contest.name}
                            <button className="btn btn-link" onClick={(e) => handleJoin(e, contest.id)}>Dołącz</button>
                        </li>
                    ))
                ) : (
                    <li>Brak konkursów</li>
                )}
            </ul>
        </>
    );
}