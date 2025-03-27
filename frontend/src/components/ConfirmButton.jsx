import React from "react";

export const ConfirmButton = (props) => {

    return (
        <>
            <button className="btn btn-success" type="submit">{props.label}</button>
        </>
    );
}