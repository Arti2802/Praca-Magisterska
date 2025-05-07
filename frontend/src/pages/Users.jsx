import React from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UnderlineNav } from "../components/UnderlineNav";
import { FaBan } from "react-icons/fa";
import toast from "react-hot-toast";

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

    const handleBan = (id) => {
        const data = {
            id: id,
            banned: true
        }
        axios.patch(`${ApiURL}/usersincontests/${id}/`, data);
        toast.success('Zbanowano użytkownika!');
    }
    return (
        <>
        <UnderlineNav page={"czlonkowie"} link_idx={2}/>
        <h1>Członkowie</h1>
        <div>
            {users.map((user) => (
                <p key={user.id}>
                    {user.user.username} {user.role + ' '}
                    {user.role !== 'owner' ? (
                        <button type="button" className="btn btn-link p-0" onClick={() => handleBan(user.id)}>
                            <FaBan className="icon red hovered"/>
                        </button>
                    ) : null}
                </p>
            ))}
        </div>
        </>
    );
}