import React from "react";

export const LinkButton = (props) => {

    return (
        <>
            <li><a className="dropdown-item" href={`${props.id}/${props.edition}/${props.link}`}>{props.label}</a></li>
        </>
    );
}