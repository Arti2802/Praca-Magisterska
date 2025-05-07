import React from "react";
import axios from "axios";
import ApiURL from "../ApiURL";
import { useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ProtectedPage = ({children}) => {
    const { id } = useParams();
    const loggedIn = sessionStorage.getItem('isLogged');
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn === 'true' && id) {
            axios.get(`${ApiURL}/contests/${id}/users/${sessionStorage.getItem('id')}/`)
            .then(response => {
                if (response.data.length === 0)
                {
                    toast.error('Nie masz dostępu do tego serwera!');
                    navigate('/');
                }
                else if (response.data[0].banned)
                {
                    toast.error('Zostałeś zbanowany na tym serwerze!');
                    navigate('/');
                }
            })
            .catch((errors) => {
                console.log(errors);
            })
        }
    }, [id, loggedIn, navigate])

    if (loggedIn !== 'true') {
        toast.error('Najpierw musisz się zalogować!');
        return <Navigate to='/logowanie'/>;
    }

    return children;
}