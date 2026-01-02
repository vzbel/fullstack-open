const CountriesView = ({ countries }) => {
    if(countries.length > 10){
        return (
            <p>
            Too many matches, 
            specify another filter
            </p>
        );
    }else if(countries.length > 1){
        return countries.map((c) => (
            <p key={c.name.common}>
                {c.name.common}
            </p>
        ));
    }else if(countries.length == 1){
        const country = countries[0];
        return (
            <article>
                <h2>{country.name.common}</h2>
                <p>Capital : {country.capital[0]}</p>
                <p>Area: {country.area}</p>

                <h3>Languages</h3>
                <ul>
                    {
                    Object.values(country.languages)
                        .map((lang) => (
                            <li key={lang}>
                                {lang}
                            </li>
                        ))
                    }
                </ul>

                <img 
                    src={country.flags.png} 
                    alt={country.flags.alt} 
                />
            </article>
        ); 
    }
};

export default CountriesView;