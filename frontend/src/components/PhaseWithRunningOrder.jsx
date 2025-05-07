import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import ReactCountryFlag from "react-country-flag";

export const PhaseWithRunningOrder = ({id}) => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (id) {
            axios.get(`${ApiURL}/phases/${id}/running-order/`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
        }
        // axios.get(`${ApiURL}/phases/${id}/entries`)
        // .then(response => {
        //     console.log(response);
        //     setEntries(response.data);
        // })
        // .catch(errors => {
        //     console.log(errors);
        // })
    }, [id])

    return (
        <>
            <div className="accordion-body">
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <p key={entry.id}>
                            {entry.running_order}. <ReactCountryFlag countryCode={entry.entry.country?.country.code} style={{width: '3em', height: '3em'}} svg/> 
                            {entry.entry?.artist} - {entry.entry?.title}
                        </p>
                    ))
                ) : (
                    <strong>Kolejność występów nie jest jeszcze znana</strong>
                )}
            </div>
        </>
    );
}