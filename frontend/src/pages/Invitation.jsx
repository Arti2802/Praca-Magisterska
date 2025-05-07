import React from "react";
//import ApiURL from "../ApiURL";
import { useParams } from "react-router-dom";
import { UnderlineNav } from "../components/UnderlineNav";

export const Invitation = () => {
    const { id } = useParams();

    return (
        <>
        <UnderlineNav page={"zaproszenie"} link_idx={2}/>
        <div className="w-25">
            <h1 className="mb-3">Zaproszenie</h1>
            <input className="form-control border border-primary" value={`http://127.0.0.1:3000/zaproszenie/${id}`}/>
        </div>
        </>
    );
}