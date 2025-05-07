import React from "react";

export const ConfirmButton = (props) => {
    const label = props.label ? props.label : "Zatwierdź";

    return (
        <>
            <button className="btn btn-success" type="submit">{label}</button>
        </>
    );
}