import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
//import ReactCountryFlag from "react-country-flag";
import { UnderlineNav } from "../components/UnderlineNav";
import { ConfirmButton } from "../components/ConfirmButton";
import { CountryRepresentation } from "../components/CountryRepresentation";
import toast from "react-hot-toast";

export const SetCountriesInEdition = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [editionCountry, setEditionCountry] = useState([]);

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

    const handleChange = (e, country) => {
        if (!editionCountry.some(item => country === item)){
            setEditionCountry([
                ...editionCountry,
                country
            ]) 
        }
        console.log(editionCountry);
    }

    const handleAdd = async(e) => {
        e.preventDefault();
        try {
            const data = editionCountry.map((ed_country) => ({
                country: ed_country,
                borrowers: ['PL', 'DE', 'FR']
            }))
            const response = await axios.post(`${ApiURL}/editions/${id2}/countries-manage/`, data)
            if (response.status === 201)
            {
                toast.success('Udało się dodać państwa!')
            }
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
            <h1>Państwa</h1>
            <UnderlineNav page={"wybierz-panstwa"} link_idx={1}/>
            <form onSubmit={handleAdd}>
                <div className="overflow-scroll" style={{height: '400px', width: '400px'}}>
                    {countries.length > 0 ? (
                        countries.map((country) => (
                            <div key={country.code}>
                                <CountryRepresentation country={country}/>
                                <input className="form-check-input border border-primary" type="checkbox" onChange={(e) => handleChange(e, country.code)}/>
                            </div>
                        ))
                    ) : (
                        <p>Brak państw</p>
                    )}
                </div>
                <ConfirmButton label={"Zatwierdź"}/>
            </form>
        </>
    );
}