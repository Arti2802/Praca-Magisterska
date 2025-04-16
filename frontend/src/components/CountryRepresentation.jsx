import ReactCountryFlag from "react-country-flag";

export const CountryRepresentation = ({country}) => {
    return (
        <>
            <ReactCountryFlag countryCode={country.code} style={{width: '3em', height: '3em'}} svg/>
            {country.name}
        </>
    );
}