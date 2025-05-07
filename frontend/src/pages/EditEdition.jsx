import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { ConfirmButton } from "../components/ConfirmButton";
import { dateFormat } from "../components/dateFormat";
import toast from "react-hot-toast";

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

    const handleChange = (e) => {
        const value = e.target.value;
        setEdition({
            ...edition,
            [e.target.name]: value
        });
    };

    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${ApiURL}/editions/${id2}/`, edition);
            console.log(response);
            if (response.status === 200)
            {
                toast.success("Udało się edytować edycję!");
            }
        }
        catch (err) {
            toast.error("Coś poszło nie tak");
            console.log(err);
        }
    }

    return (
        <>
            <h1>Edycja {edition.count}</h1>
            <UnderlineNav page={"edytuj"} link_idx={1}/>
            <form className="w-50 mt-3" onSubmit={handleEdit}>
                <div className="mb-3">
                    <label className="form-label">Data rozpoczęcia rezerwacji państw</label>
                    <input className="form-control border border-primary" type="datetime-local" name="claiming_start_date" value={dateFormat(edition.claiming_start_date)} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data zakończenia rezerwacji państw</label>
                    <input className="form-control border border-primary" type="datetime-local" name="claiming_end_date" value={dateFormat(edition.claiming_end_date)} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data rozpoczęcia wysyłania utworów</label>
                    <input className="form-control border border-primary" type="datetime-local" name="sending_songs_start" value={dateFormat(edition.sending_songs_start)} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data zakończenia wysyłania utworów</label>
                    <input className="form-control border border-primary" type="datetime-local" name="sending_songs_end" value={dateFormat(edition.sending_songs_end)} onChange={handleChange}/>
                </div>
                <ConfirmButton/>
            </form>
        </>
    );
}