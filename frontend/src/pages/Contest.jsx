import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import { LinkButton } from "../components/LinkButton";
import { IoMdSettings } from "react-icons/io";
import { Channel } from "../components/Channel"; 
import { FaPlus } from "react-icons/fa";
import { ConfirmButton } from "../components/ConfirmButton";
import toast from "react-hot-toast";

//import toast from "react-hot-toast";

export const Contest = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});
    const [users, setUsers] = useState([]);
    const [editionsActual, setEditionsActual] = useState([]);
    const [editionsOld, setEditionsOld] = useState([]);
    const [channels, setChannels] = useState([]);
    const [activeChannel, setActiveChannel] = useState(null);
    const [add, setAdd] = useState(false);
    const [name, setName] = useState('');

    let addForm = {};
    if (add) {
        addForm.display = 'block';
    }
    else {
        addForm.display = 'none';
    }

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

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/channels/`)
        .then(response => {
            console.log(response);
            setChannels(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id])

    useEffect(() => {
        if (channels.length > 0 && activeChannel === null) {
            setActiveChannel(channels[0].id);
        }
    }, [channels, activeChannel]);

    const handleAddChannel = async(e) => {
        e.preventDefault();
        const data = {
            name: name,
            contest: id
        };
        try {
            const response = await axios.post(`${ApiURL}/contests/${id}/channels/`, data);
            console.log(response);
            if (response.status === 201)
            {
                toast.success('Udało się dodać kanał!');
                setAdd(false);
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
            <h1 style={{float: 'left'}}>{contest.name}</h1>
            <a href={`${id}/ustawienia`}>
                <IoMdSettings className="sort"/>
            </a>
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
            <div style={{clear: 'left'}}>
                <a href={`${id}/nowa-edycja`}><button className="btn btn-primary mb-2">Nowa edycja</button></a>
                {editionsActual.length > 0 ? (
                    editionsActual.map((editionActual) => (
                        <div className="dropdown mb-3" key={editionActual.id}>
                            <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Edycja {editionActual.count}
                            </button>
                            <ul className="dropdown-menu">
                                <LinkButton id={id} edition = {editionActual.id} link="rezerwacja-panstw" label="Zarezerwuj państwo"/>
                                <LinkButton id={id} edition = {editionActual.id} link="zglaszanie-piosenki" label="Zgłoś piosenkę"/>
                                <LinkButton id={id} edition = {editionActual.id} link="glosowanie" label="Zagłosuj"/>
                                <LinkButton id={id} edition = {editionActual.id} link="informacje" label="Informacje o edycji"/>
                                <LinkButton id={id} edition = {editionActual.id} link="edytuj" label="Edytuj"/>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p><strong>Żadna edycja aktualnie się nie odbywa</strong></p>
                )} 
            </div>
            <p>Regulamin</p>
            {/* <p>Czat</p> */}
            <div>
                <div className="d-inline-flex">
                    <h2>Kanały</h2>
                    <button className="btn btn-link" type="button" onClick={() => setAdd(true)}>
                        <FaPlus className="icon green"/>
                    </button>
                </div>
                <form style={addForm} onSubmit={handleAddChannel}>
                    <input name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <ConfirmButton/>
                </form>
                <div className="d-block">
                    {channels.map((channel) => (
                        <button
                        key={channel.id}
                        className={`btn btn-outline-primary ${activeChannel === channel.id ? 'active' : ''}`}
                        onClick={() => setActiveChannel(channel.id)}
                        >
                            {channel.name}
                        </button>
                    ))}
                    {channels.find(channel => channel.id === activeChannel) && (
                        <Channel channel={channels.find(channel => channel.id === activeChannel)} />
                    )}
                </div>
            </div>
            <h2 className="my-3">Archiwum edycji</h2>
            <div className="accordion" id="editionAccordion">
                {editionsOld.length > 0 ? (
                    editionsOld.map((editionOld, index) => (
                        <div className="accordion-item col-3" key={editionOld.id}>
                            <h2 className="accordion-header">
                                <button 
                                className={`accordion-button border border-primary ${index !== 0 ? 'border-top-0': ''}`} 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#collapse${editionOld.id}`} 
                                aria-expanded="false" 
                                aria-controls={`collapse${editionOld.id}`}>
                                    Edycja {editionOld.count}
                                </button>
                            </h2>
                            <div 
                            id={`collapse${editionOld.id}`} 
                            className="accordion-collapse collapse"
                            data-bs-parent="#editionAccordion">
                                <div className="accordion-body border border-primary border-top-0">
                                    <a href={`/konkursy/${id}/${editionOld.id}/wyniki/${editionOld.final.id}`}><button className="btn btn-primary">Wyniki edycji</button></a>
                                    {/* <LinkButton id={id} edition = {editionOld.id} link={`wyniki/${editionOld.final.id}`} label="Wyniki edycji"/> */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <strong>Żadna edycja jeszcze się nie odbyła</strong>
                )} 
            </div>
        </>
    );
}