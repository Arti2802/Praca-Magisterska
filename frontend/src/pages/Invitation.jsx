import React from "react";
import ApiURL from "../ApiURL";
import { useParams } from "react-router-dom";
import { UnderlineNav } from "../components/UnderlineNav";

export const Invitation = () => {
    const { id } = useParams();

    return (
        <>
        <UnderlineNav page={"zaproszenie"} link_idx={2}/>
        <div className="w-25">
            <label className="form-label">Zaproszenie</label>
            <input className="form-control border border-primary" value={`${ApiURL}/konkursy/${id}`}/>
        </div>
        </>
    );
}