import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import ReactCountryFlag from "react-country-flag";

export const ClaimingCountry = () => {
    const { id } = useParams();
    //const [contest, setContest] = useState({});
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/countries/`)
        .then(response => {
            console.log(response);
            setCountries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])
    return (
        <>
            <h1>Państwa</h1>
            <ul>
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <li key={country.code}>
                            <ReactCountryFlag countryCode={country.code} style={{width: '3em', height: '3em'}} svg/>
                            {country.name}
                        </li>
                    ))
                ) : (
                    <li>Żadna edycja jeszcze się nie odbyła</li>
                )} 
            </ul>
        </>
    );
}