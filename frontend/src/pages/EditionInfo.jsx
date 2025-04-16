import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";

export const EditionInfo = () => {
    const { id2 } = useParams();
    const [edition, setEdition] = useState({});

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/`)
        .then(response => {
            console.log(response);
            setEdition(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    const Info = ({date}) => {
        return (
            <>
                {date ? date : 'Brak informacji'}
            </>
        )
    }

    return (
        <>
            <h1>Edycja {edition.count}</h1>
            <UnderlineNav page={"informacje"} link_idx={0}/>
            <b>Data rozpoczęcia rezerwacji państw</b>
            <p><Info date={edition.claiming_start_date}/></p>
            <b>Data zakończenia rezerwacji państw</b>
            <p><Info date={edition.claiming_end_date}/></p>
            <b>Data rozpoczęcia wysyłania utworów</b>
            <p><Info date={edition.sending_songs_start_date}/></p>
            <b>Data zakończenia wysyłania utworów</b>
            <p><Info date={edition.sending_songs_end_date}/></p>
        </>
    );
}