import { useState } from "react";
import Country from "./Country";

const CountriesView = ({ countries }) => {
    const [countryToShow, setCountryToShow] = useState(null);
    const handleShow = (country) => {
        setCountryToShow(country);
    };

    if(countries.length > 10){
        return (
            <p>
            Too many matches, 
            specify another filter
            </p>
        );
    }else if(countries.length > 1){
        return (
            countryToShow 
            ?
                <>
                    <Country country={countryToShow} /> 
                    <button onClick={() => handleShow(null)}>
                        Back
                    </button>
                </>
            : 
                countries.map((c) => (
                <div key={c.name.common}>
                    {c.name.common}
                    <button onClick={() => handleShow(c)}>
                        Show
                    </button>
                </div>
                ))
        );
    }else if(countries.length == 1){
        return (
            <Country country={countries[0]} />
        ); 
    }
};

export default CountriesView;