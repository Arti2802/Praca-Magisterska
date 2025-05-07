import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import toast from "react-hot-toast";


export const NewEdition = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [edition, setEdition] = useState({});
    const [number, setNumber] = useState(0);

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/editions/`)
        .then((response) => {
            setNumber(response.data.length);
        })
    }, [id])

    const handleChange = (e) => {
        const value = e.target.value;
        setEdition({
            ...edition,
            [e.target.name]: value
        });
    };

    const handleCreate = async(e) => {
        e.preventDefault();
        const data = {
            ...edition,
            contest: id,
            count: number + 1,
        };
        try {
            const response = await axios.post(`${ApiURL}/editions/`, data);
            console.log(response);
            if (response.status === 201)
            {
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
            <h1>Nowa edycja</h1>
            <form className="col-3 mx-2 group" onSubmit={handleCreate}>
                <div className="mb-3">
                    <label className="form-label">Data rozpoczęcia rezerwacji państw</label>
                    <input className="form-control border border-primary" type="datetime-local" name="claiming_start_date" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data zakończenia rezerwacji państw</label>
                    <input className="form-control border border-primary" type="datetime-local" name="claiming_end_date" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data rozpoczęcia wysyłania utworów</label>
                    <input className="form-control border border-primary" type="datetime-local" name="sending_songs_start_date" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data zakończenia wysyłania utworów</label>
                    <input className="form-control border border-primary" type="datetime-local" name="sending_songs_end_date" onChange={handleChange}/>
                </div>
                <button className="btn btn-success" type="submit">Zatwierdź</button>
            </form>
        </>
    );
}