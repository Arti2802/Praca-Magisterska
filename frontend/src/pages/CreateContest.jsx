import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";


export const CreateContest = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    const handleChangeLogo = (e) => {
        const file = e.target.files[0];
        setData({
            ...data,
            [e.target.name]: file
        });
    };
    const handleCreate = async(e) => {
        e.preventDefault();
        try {
            console.log(data);
            const response = await axios.post(`${ApiURL}/contests/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                  }
            });
            console.log(response);
            if (response.status === 201)
            {
                navigate('/');
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
            <h1>Stwórz konkurs</h1>
            <form className="col-3 mx-2 group" onSubmit={handleCreate}>
                    <div className="mb-3">
                        <input className="form-control" placeholder="Nazwa" name="name" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="logo">Logo</label>
                        <input className="form-control" type="file" name="logo" accept="image/*" onChange={handleChangeLogo}/>
                    </div>
                    <button className="btn btn-success" type="submit">Zatwierdź</button>
            </form>
        </>
    );
}