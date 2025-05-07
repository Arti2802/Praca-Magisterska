import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";
import { UnderlineNav } from "../components/UnderlineNav";
import { PhaseWithRunningOrder } from "../components/PhaseWithRunningOrder";

export const RunningOrder = () => {
    const { id2 } = useParams();
    //const navigate = useNavigate();
    const [semifinals, setSemifinals] = useState([]);
    const [final, setFinal] = useState({});

    useEffect(() => {
        axios.get(`${ApiURL}/editions/${id2}/semifinals/`)
        .then(response => {
            console.log(response);
            setSemifinals(response.data);
            axios.get(`${ApiURL}/editions/${id2}/`)
            .then(response => {
                console.log(response);
                setFinal(response.data.final);
            })
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id2])

    return (
        <>
            <h1>Kolejność występów</h1>
            <UnderlineNav page={"kolejnosc-wystepow"} link_idx={0}/>
            <div className="accordion" id="accordionExample">
                {semifinals.length > 0 ? (
                    semifinals.map((semifinal, index) => (
                        <div className="accordion-item" key={semifinal.id}>
                            <h2 className="accordion-header">
                                <button 
                                className="accordion-button" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#collapse${semifinal.id}`} 
                                aria-expanded="false" 
                                aria-controls={`collapse${semifinal.id}`}>
                                    Półfinał {semifinal.count}
                                </button>
                            </h2>
                            <div 
                            id={`collapse${semifinal.id}`} 
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <PhaseWithRunningOrder id={semifinal.id}/>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    null
                )}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button 
                        className="accordion-button" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapseFinal" 
                        aria-expanded="false" 
                        aria-controls="collapseFinal">
                            Finał
                        </button>
                    </h2>
                    <div id="collapseFinal" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <PhaseWithRunningOrder id={final?.id}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}