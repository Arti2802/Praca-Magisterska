import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { ConfirmButton } from "../components/ConfirmButton";
import toast from "react-hot-toast";


export const NewSemifinal = () => {
    const { id2 } = useParams();
    const navigate = useNavigate();
    const [semifinal, setSemifinal] = useState({});
    const [number, setNumber] = useState(0);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/semifinals/`)
        .then((response) => {
            console.log(response);
            setNumber(response.data.length);
        })
    }, [id2])

    const handleChange = (e) => {
        const value = e.target.value;
        setSemifinal({
            ...semifinal,
            [e.target.name]: value
        });
    };

    const handleCreate = async(e) => {
        e.preventDefault();
        const data = {
            ...semifinal,
            edition: id2,
            count: number + 1,
        };
        try {
            const response = await axios.post(`${ApiURL}/semifinals/`, data);
            console.log(response);
            if (response.status === 201)
            {
                toast.success('Udało się dodać nowy półfinał');
                navigate('/');
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
    return (
        <>
            <h1>Nowy półfinał</h1>
            <form className="col-3 mx-2 group" onSubmit={handleCreate}>
                <div className="mb-3">
                    <label className="form-label">Data rozpoczęcia głosowania</label>
                    <input className="form-control border border-primary" type="datetime-local" name="voting_start_date" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data zakończenia głosowania</label>
                    <input className="form-control border border-primary" type="datetime-local" name="voting_end_date" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data ogłoszenia wyników</label>
                    <input className="form-control border border-primary" type="datetime-local" name="results_date" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Liczba państw wchodzących do finału</label>
                    <input className="form-control border border-primary" type="number" name="number_of_countries_qualify" onChange={handleChange}/>
                </div>
                <ConfirmButton/>
            </form>
        </>
    );
}