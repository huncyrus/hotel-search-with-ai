import { FC } from 'react';
import { SearchSuggestionProps } from '../../interfaces/SearchInput';

/**
 * SearchSuggestions component.
 *
 * @note with error block.
 */
const SearchSuggestions: FC<SearchSuggestionProps> = ({isLoading, suggestions, error, handleSuggestionClick}: SearchSuggestionProps) => {
    return (
        
        <div className={`w-full ${isLoading ? 'opacity-50' : ''}`}>
            {
                suggestions &&
                suggestions.message &&
                suggestions.message.content &&
                <div
                    className="hover:underline hover:text-fuchsia-950 cursor-pointer" 
                    onClick={() => handleSuggestionClick(suggestions)}
                >
                    {JSON.parse(suggestions.message.content).city}
                </div>
            }

            {error && <p> Error: {error} </p>}
        </div>
    )
}

export default SearchSuggestions;
