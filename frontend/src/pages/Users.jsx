import React from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UnderlineNav } from "../components/UnderlineNav";
import { FaBan } from "react-icons/fa";

export const Users = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/contests/${id}/users/`)
        .then(response => {
            console.log(response);
            setUsers(response.data);
        })
    }, [id])
    return (
        <>
        <h1>Członkowie</h1>
        <UnderlineNav page={"czlonkowie"} link_idx={2}/>
        <div>
            {users.map((user) => (
                <p key={user.id}>
                    {user.user.username} {user.role + ' '}
                    {user.role !== 'owner' ? <FaBan className="icon red"/> : null}
                </p>
            ))}
        </div>
        </>
    );
}