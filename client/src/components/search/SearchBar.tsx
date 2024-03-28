import { useState, FC } from 'react';
import axios, { AxiosError } from 'axios';
import { FaAngleDoubleRight } from "react-icons/fa";
import { BeatLoader } from 'react-spinners';
import { SearchBarProps } from '../../interfaces/SearchBarInterface';
import Loader from '../common/Loader';
import SearchSuggestions from './SearchSuggestions';

/**
 * SearchBar component.
 * Shall be used to search for hotels.
 *
 * @note uses autosuggestion by OpenAI on backend.
 * @note the error message is not formatted.
 */
const SearchBar: FC<SearchBarProps> = ({ setResults }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState([]);

    /**
     * Search mechanism for hotels. Sends it to the backend for processing.
     * If error happens, it sets the error state.
     */
    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:3001/api/search`, { query: searchTerm });
            setResults(response.data);
            setError(null);
        } catch (err: unknown) {
            const error: AxiosError = err as unknown as AxiosError;
            setError(error.message);
        }
        setIsLoading(false);
    };

    /**
     * Updates the search term with the selected city from the suggestions.
     *
     * @param suggestions object from openAI sdk.
     * @returns void
     * @note does not contain any error handling.
     * @note does not set the error state.
     */
    const handleSuggestionClick = (suggestions: { message: { content: string } }) => {
        if (
            !suggestions
            || !suggestions.message
            || !suggestions.message.content
        ) {
            return;
        }

        try {
            const city = JSON.parse(suggestions.message.content).city;
            const terms = searchTerm.split(' ');
            terms[terms.length - 1] = city;
            setSearchTerm(terms.join(' '));
        } catch (err) {
            // console.error('Error parsing suggestion:', err);
        }
    };

    /**
     * Handling autocompletion via backend. It sends the input value to the backend for suggestions.
     *
     * @note does not set the error state
     */
    //const handleChange = async (value: string) => {
    const handleChange = async (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        setSearchTerm(value);
        
        // Send input value to backend for suggestions
        try {
          const response = await axios.post('http://localhost:3001/suggestions', { input: value });
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
    };

    return (
        <div className="w-full relative">
            {isLoading && (
                <Loader />
            )}

            <div className={`w-full ${isLoading ? 'opacity-50' : ''}`}>
                <div className="w-full shadow-sm">
                    <div className='max-w-7xl pb-2 px-4 items-center mx-auto'>
                        <div className="flex rounded-lg">
                            <input 
                                type="search" 
                                name="search"
                                placeholder="Search for a city and dates..."
                                value={searchTerm}
                                onChange={handleChange}
                                className="py-3 px-4 block w-full border border-r-0 rounded-e-none border-gray-400 rounded-s-lg focus:border-gray-400"
                            />
                            <button 
                                type="button" 
                                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-teal-400 text-white hover:bg-teal-600 "
                                onClick={handleSearch}
                                disabled={isLoading}
                            >
                                Search
                                {isLoading ? <BeatLoader color="#fff" size={2} className="fill-current w-6 h-6" /> : <FaAngleDoubleRight className="fill-current w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                <SearchSuggestions
                    isLoading={isLoading}
                    suggestions={suggestions}
                    error={error}
                    handleSuggestionClick={handleSuggestionClick}
                />
            </div>
        </div>
    );
};

export default SearchBar;
