import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { ConfirmButton } from "../components/ConfirmButton";

export const SendSong = () => {
    const { id, id2 } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    const handleSend = async(e) => {
        e.preventDefault();
        try {
            const fullData = {
                'Youtube_URL': data.yt,
                'Spotify_URL': data.spotify,
                'ts': data.ts,
                'artist': data.artist,
                'title': data.title,
                'user': 1,
                'edition': id2
            }

            const response = await axios.post(`${ApiURL}/entries/`, fullData);
            console.log(response);
            if (response.status === 201)
            {
                navigate(`/${id}`);
            }
        } catch (err) {
            console.log(err);
            if (!err.response) {
                alert('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                alert("Coś poszło nie tak");
            } else if (err.response?.status === 401){
                alert('Brak autoryzacji');
            } else {
                alert('Coś poszło nie tak');
            }
        }
    }
    return (
        <>
            <h1>Zgłoś utwór</h1>
            <form className="col-3 mx-2 group" onSubmit={handleSend}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="yt">Artysta</label>
                    <input className="form-control" placeholder="Artysta" name="artist" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="yt">Tytuł</label>
                    <input className="form-control" placeholder="Tytuł" name="title" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="yt">Link YT</label>
                    <input className="form-control" placeholder="Link YT" name="yt" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="spotify">Link Spotify</label>
                    <input className="form-control" placeholder="Link Spotify" name="spotify" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="ts">Fragment z YT (TS)</label>
                    <input className="form-control" placeholder="0:00" name="ts" onChange={handleChange}/>
                </div>
                <ConfirmButton label="Zatwierdź"/>
            </form>
        </>
    );
}