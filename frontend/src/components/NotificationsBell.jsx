import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ApiURL from "../ApiURL";
import { FaBell } from "react-icons/fa";
import { Popover } from "react-tiny-popover";

export const NotificationsBell = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationsUnread, setNotificationsUnread] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/users/${sessionStorage.getItem('id')}/notifications/`)
        .then((response) => {
            console.log(response);
            setNotifications(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [])

    useEffect(() => {
        setNotificationsUnread(notifications.filter(notification => !notification.read));
    }, [notifications])

    const handleRead = () => {
        setIsPopoverOpen(false);
        axios.put(`${ApiURL}/users/${sessionStorage.getItem('id')}/read-notifications/`)
        .then(() => {
            setNotificationsUnread([]);
        })
        .catch(errors => {
            console.log(errors);
        })
    }

    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={['bottom']}
            align={"end"} 
            padding={10} 
            onClickOutside={handleRead} 
            content={(
                <div className="card shadow overflow-scroll" style={{height: '500px'}}>
                    <div className="card-body">
                        <h5 className="card-title border-bottom border-dark-subtle pb-1">Powiadomienia</h5>
                        <div>
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <p className="card-text shadow px-2 py-1 my-2" key={notification.id}>
                                        <h6>{notification.contest.name}</h6>
                                        {notification.message}
                                    </p>
                                ))
                            ) : (
                                <p className="card-text text-body-secondary">Brak nowych powiadomień</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            >
            <button type="button" className="btn btn-link position-relative p-0" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                <FaBell className="icon white hovered"/>
                {!isPopoverOpen ? (
                    notificationsUnread.length > 0 ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {notificationsUnread.length > 9 ? "9+" : notificationsUnread.length}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    ) : null
                ) : null}
            </button>
        </Popover>
    );
}