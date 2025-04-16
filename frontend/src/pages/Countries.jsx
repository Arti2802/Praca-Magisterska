import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
//import ReactCountryFlag from "react-country-flag";
import { UnderlineNav } from "../components/UnderlineNav";
import { CountryRepresentation } from "../components/CountryRepresentation";

export const Countries = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/countries`)
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
            <UnderlineNav page={"panstwa"} link_idx={0}/>
            <div>
                {countries.length > 0 ? (
                    countries.map((country) => (
                        // <li key={country.id}>
                        //     <ReactCountryFlag countryCode={country.country.code} style={{width: '3em', height: '3em'}} svg/>
                        //     {country.country.name}
                        // </li>
                        <div key={country.id}>
                            <CountryRepresentation country={country.country}/>
                        </div>
                    ))
                ) : (
                    <li>Brak piosenek</li>
                )}
            </div>
        </>
    );
}