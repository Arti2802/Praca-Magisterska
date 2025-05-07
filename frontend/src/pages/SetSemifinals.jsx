import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { ConfirmButton } from "../components/ConfirmButton";
import { CountryRepresentation } from "../components/CountryRepresentation";
import toast from "react-hot-toast";

export const SetSemifinals = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    //const [edition, setEdition] = useState({});
    const [entries, setEntries] = useState([]);
    const [semifinals, setSemifinals] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/entries/`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
            axios.get(`${ApiURL}/editions/${id2}/semifinals/`)
            .then(response => {
                console.log(response);
                setSemifinals(response.data);
            })
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    let numbers = entries.map(() => 1);

    const handleChange = (e, index) => {
        numbers[index] = parseInt(e.target.value);
        console.log(numbers);
    };

    const handleAdd = async(e) => {
        e.preventDefault();
        try {
            const data = entries.map((entry, index) => ({
                entry: entry.id,
                semifinal: numbers.at(index)
            }));
            console.log(data);
            const response = await axios.post(`${ApiURL}/semifinals/2/entries/`, data);
            if (response.status === '201')
                toast.error("Udało się!");
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
            <h1>Przydziel piosenki do półfinałów</h1>
            <UnderlineNav page={"ustal-polfinaly"} link_idx={1}/>
            <form onSubmit={handleAdd}>
                {entries.length > 0 ? (
                    entries.map((entry, index) => (
                        <div key={entry.id}>
                            <CountryRepresentation country={entry.country.country}/>
                            <span> {entry.artist} - {entry.title}</span>
                            <select defaultValue={0} onChange={(e) =>handleChange(e, index)}>
                                <option value={0} disabled>Wybierz półfinał</option>
                                {semifinals.length > 0 ? (
                                    semifinals.map((semifinal) => (
                                        <option key={semifinal.id} value={semifinal.id}>Półfinał {semifinal.count}</option>
                                    ))
                                ) : null}
                            </select>
                        </div>
                    ))
                ) : (
                    <p>Brak państw</p>
                )}
                <ConfirmButton label={"Zatwierdź"}/>
            </form>
        </>
    );
}