import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import ReactCountryFlag from "react-country-flag";
import { ConfirmButton } from "../components/ConfirmButton";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SortableItem } from "../components/SortableItem";
import { SortableList } from "../components/SortableList";
import toast from "react-hot-toast";

export const ClaimingCountry = () => {
    const { id2 } = useParams();
    //const [contest, setContest] = useState({});
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/countries/`)
        .then(response => {
            console.log(response);
            setCountries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    const handleClaim = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${ApiURL}/claim-country/${sessionStorage.getItem('id')}/`, countries)
            if (response.status === 200)
            {
                toast.success(response.data.message);
                navigate('/');
            }
        } catch (err) {
            if (!err.response) {
                toast.error('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                toast.error(err.response.data.message);
            } else if (err.response?.status === 401){
                toast.error('Brak autoryzacji');
            } else {
                toast.error('Coś poszło nie tak');
            }
        }
    }

    return (
        <>
            <h1>Państwa</h1>
            <form onSubmit={handleClaim}>
                <SortableList items={countries} setItems={setCountries}>
                    {countries.map((country) => (
                        <SortableItem key={country.id} id={country}>
                            <ReactCountryFlag countryCode={country.country.code} style={{width: '3em', height: '3em'}} svg/>
                            {country.country.name}
                        </SortableItem>
                    ))}
                </SortableList>
                <ConfirmButton label="Zatwierdź"/>
            </form>
        </>
    );

}