import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
//import ReactCountryFlag from "react-country-flag";
import { UnderlineNav } from "../components/UnderlineNav";
import { ConfirmButton } from "../components/ConfirmButton";
import { CountryRepresentation } from "../components/CountryRepresentation";

export const SetCountriesInEdition = () => {
    //const { id2 } = useParams();
    //const navigate = useNavigate();
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
    }, [])

    return (
        <>
            <h1>Państwa</h1>
            <UnderlineNav page={"wybierz-panstwa"} link_idx={1}/>
            <div className="overflow-scroll" style={{height: '400px', width: '400px'}}>
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <div key={country.code}>
                            <CountryRepresentation country={country} key={country.id}/>
                            <input className="form-check-input border border-primary" type="checkbox"/>
                        </div>
                    ))
                ) : (
                    <li>Brak państw</li>
                )}
            </div>
            <ConfirmButton label={"Zatwierdź"}/>
        </>
    );
}