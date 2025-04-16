import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { SortableList } from "../components/SortableList";
import { SortableItem } from "../components/SortableItem";

export const SetRunningOrder = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/phases/2/entries/`)
        .then(response => {
            console.log(response);
            setEntries(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [])

    return (
        <>
            <h1>Ustal kolejność występów</h1>
            <UnderlineNav page={"ustal-kolejnosc-wystepow"} link_idx={1}/>
            <SortableList items={entries} setItems={setEntries}>
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <SortableItem key={entry.id} id={entry}>
                            {entry.running_order}. {entry.entry?.artist} - {entry.entry?.title}
                        </SortableItem>
                    ))
                ) : (
                 <p>Kolejność występów nie jest jeszcze znana</p>
                )}
            </SortableList>
        </>
    );
}