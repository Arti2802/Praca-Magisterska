import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { LinkButton } from "../components/LinkButton";

export const Contest = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});
    const [users, setUsers] = useState([]);
    const [editionsActual, setEditionsActual] = useState([]);
    const [editionsOld, setEditionsOld] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/`)
        .then(response => {
            console.log(response);
            setContest(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/users/`)
        .then(response => {
            console.log(response);
            setUsers(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/editions/?actual=true`)
        .then(response => {
            console.log(response);
            setEditionsActual(response.data);
        })
        .then(
           axios.get(`${ApiURL}/contests/${id}/editions/?actual=false`) 
           .then(response => {
            console.log(response);
            setEditionsOld(response.data);
        })
        )
        .catch(errors => {
            console.log(errors);
        })
    }, [id])
    return (
        <>
            <h1>{contest.name}</h1>
            <div className="float-end">
                <h2>Użytkownicy</h2>
                <ul>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li key={user.id}>
                                {user.user.username}
                            </li>
                        ))
                    ) : (
                        <li>Brak użytkowników</li>
                    )}
                </ul>
            </div>
            <ul>
                {editionsActual.length > 0 ? (
                    editionsActual.map((editionActual) => (
                        <li key={editionActual.id}>
                            <p>Edycja {editionActual.count}</p>
                            <div className="btn-group">
                                <LinkButton id={id} edition = {editionActual.id} link="rezerwacja-panstw" label="Zarezerwuj państwo"/>
                                <LinkButton id={id} edition = {editionActual.id} link="zglaszanie-piosenki" label="Zgłoś piosenkę"/>
                                <LinkButton id={id} edition = {editionActual.id} link="glosowanie" label="Zagłosuj"/>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>Żadna edycja jeszcze się nie odbyła</li>
                )} 
            </ul>
            <p>Regulamin</p>
            <p>Czat</p>
            <h2>Archiwum edycji</h2>
            <ul>
                {editionsOld.length > 0 ? (
                    editionsOld.map((editionOld) => (
                        <li key={editionOld.id}>
                            <p>Edycja {editionOld.count}</p>
                            <LinkButton id={id} edition = {editionOld.id} link={`wyniki/1`} label="Wyniki edycji"/>
                        </li>
                    ))
                ) : (
                    <li>Żadna edycja jeszcze się nie odbyła</li>
                )} 
            </ul>
        </>
    );
}