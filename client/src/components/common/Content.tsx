import { useState } from 'react'
import SearchBar from '../search/SearchBar';
import Results from '../results/Results';

const Content = () => {
    const [results, setResults] = useState([]);

    return (
        <div className="mb-auto flex-grow">
            <SearchBar setResults={setResults} />
            <Results results={results} />
        </div>
    );
}

export default Content;
