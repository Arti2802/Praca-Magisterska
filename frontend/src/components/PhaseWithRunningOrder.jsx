import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiURL from "../ApiURL";

export const PhaseWithRunningOrder = ({id}) => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/phases/${id}/entries`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])

    return (
        <>
            <ul>
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <li key={entry.id}>
                            {entry.running_order}. {entry.entry?.artist} - {entry.entry?.title}
                        </li>
                    ))
                ) : (
                    <li>Kolejność występów nie jest jeszcze znana</li>
                )}
            </ul>
        </>
    );
}