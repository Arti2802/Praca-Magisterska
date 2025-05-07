import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import { ConfirmButton } from "../components/ConfirmButton";
import { dateFormat } from "../components/dateFormat"; 
import toast from "react-hot-toast";


export const Channel = ({channel}) => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get(`${ApiURL}/channels/${channel?.id}/messages/`) 
        .then(response => {
            console.log(response);
            setMessages(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [channel?.id])

    const handleSendMessage = async(e) => {
        e.preventDefault();
        const data = {
            channel: channel?.id,
            content: content,
            user: sessionStorage.getItem('id')
        };
        try {
            console.log(content);
            const response = await axios.post(`${ApiURL}/messages/`, data);
            console.log(response);
            if (response.status === 201)
            {
                response.data.user = {
                    username: sessionStorage.getItem('username')
                };
                setMessages([
                    response.data,
                    ...messages
                ]);
                setContent('');
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
        <div className="channel w-75 rounded-1 border border-secondary my-3 py-2">
            <form className="d-inline-flex sticky-bottom" onSubmit={handleSendMessage}>
                <textarea 
                className="w-50 shadow rounded-1 border border-black ms-3 p-2" 
                placeholder="Napisz coś..." 
                autoFocus={true}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required/>
                <div className="my-3 mx-2">
                    <ConfirmButton label="Wyślij"/>
                </div>
            </form>
            {messages.map((message) => (
                <div className="position-relative w-50 rounded-1 shadow border border-primary px-2 pt-2 pb-2 m-3" key={message.id}>
                    <b className="position-absolute top-0" style={{left: '1%'}}>{message.user.username}</b>
                    <p className="pt-4 ps-2">{message.content}</p>
                    <span className="position-absolute top-0" style={{right: '2%'}}>{dateFormat(message.creation_date)}</span>
                </div>
            ))}
        </div>
    );
}