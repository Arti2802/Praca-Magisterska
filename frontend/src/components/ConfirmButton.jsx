import React from "react";

export const ConfirmButton = (props) => {

    return (
        <>
            <button className="btn btn-success">{props.label}</button>
        </>
    );
}