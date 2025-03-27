import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { ConfirmButton } from "../components/ConfirmButton";
import { SortableItem } from "../components/SortableItem";
import { SortableList } from "../components/SortableList";

export const Voting = () => {
    const { id2 } = useParams();
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const points = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/entries/`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    const handleSend = async(e) => {
        e.preventDefault();
        try {
            const votes = [];
            for (let i=0; i<entries.length; i++) {
                const vote = {
                    points: points.at(i),
                    user: sessionStorage.getItem('id'),
                    entry: entries.at(i).id
                }
                votes.push(vote);
            }
            // const votes = entries.map((entry, i) => ({
            //     points: points.at(i),
            //     user: sessionStorage.getItem('id'),
            //     entry: entry.id
            // }));
            const response = await axios.post(`${ApiURL}/votes/`, votes);
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
            <h1>Głosowanie</h1>
            <form onSubmit={handleSend}>
                <ul>
                    {entries.length > 0 ? (
                        <SortableList items={entries} setItems={setEntries}>
                        {entries.map((entry, idx) => (
                            <SortableItem key={entry.id} id={entry}>
                                    {entry.artist} - {entry.title} {points.at(idx)}
                            </SortableItem>
                        ))}
                        </SortableList>
                    ) : (
                        <li>Żadna piosenka nie została jeszcze dodana</li>
                    )}
                </ul>
                <ConfirmButton label="Zagłosuj"/>
            </form>
        </>
    );
}