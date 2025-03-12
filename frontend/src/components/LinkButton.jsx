import React from "react";

export const LinkButton = (props) => {

    return (
        <>
            <a href={`${props.id}/${props.edition}/${props.link}`}><button className="btn btn-primary" type="button">{props.label}</button></a>
        </>
    );
}