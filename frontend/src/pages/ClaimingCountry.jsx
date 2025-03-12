import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import ReactCountryFlag from "react-country-flag";
import { ConfirmButton } from "../components/ConfirmButton";

export const ClaimingCountry = () => {
    const { id2 } = useParams();
    //const [contest, setContest] = useState({});
    const [countries, setCountries] = useState([]);

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
    return (
        <>
            <h1>Państwa</h1>
            <ul>
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <li key={country.id}>
                            <ReactCountryFlag countryCode={country.country.code} style={{width: '3em', height: '3em'}} svg/>
                            {country.country.name}
                        </li>
                    ))
                ) : (
                    <li>Żadna państwo nie bierze udziału w tej edycji</li>
                )} 
            </ul>
            <ConfirmButton label="Zatwierdź"/>
        </>
    );
}