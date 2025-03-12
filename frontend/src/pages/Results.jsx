import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";

export const Results = () => {
    const { id3 } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/phases/${id3}/results/`)
        .then(response => {
            console.log(response);
            setResults(response.data);
        })
        .catch(errors => {
            console.log(errors);
        })
    }, [id3])
    return (
        <>
            <h1>Wyniki</h1>
            <table className="table-bordered border-dark col-6 mx-2">
                <thead>
                    <tr>
                        <th className="col text-center">Utwór</th>
                        <th className="col text-center">Punkty</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results.map((result) => (
                            <tr key={result.id}>
                                <td className="col text-center">{result.song}</td>
                                <td className="col text-center">{result.points}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="col text-center" colSpan="2"><h3>Brak wyników</h3></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}