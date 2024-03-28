import { FC } from 'react';
import { ResultsProps, Result } from '../../interfaces/HotelInterface';
import NoResults from './NoResults';
import Features from './Features';
import StarRating from './StarRating';
import ResultImage from './ResultImage';
import PriceBox from './PriceBox';

/**
 * Results component
 *
 * Mapping the results from the backend to render hotels with prices and ratings.
 * The `ResultsProps` is populated by the SearchBar component.
 */
const Results: FC<ResultsProps> = ({ results }) => {
    /**
     * Helper method to create a URL for the hotel detail page.
     */
    const createUrl = (result: Result): string => {
        const parts = `${result.countryCode}/${result.center.lat}/${result.center.lng}/1/1`;
        const url = new URL(parts, process.env.REACT_APP_HOTEL_ENDPOINT).href;

        return url;
    }

    return (
        <div className="w-full bg-[#C6DEE6]">
            <div className="bg-gray-200 my-5 py-5 max-w-7xl mx-auto">
                
                {!results && <NoResults />}

                {results && results.map(result => (
                    <div 
                        key={result.id}
                        className="mx-3 my-5 bg-white rounded-lg shadow-md p-5 flex flex-col md:flex-row justify-between items-center"
                    >
                        <ResultImage result={result} />
                        <div className="flex-grow">
                            <div className="flex flex-col md:flex-row mt-4 md:mt-0 md:ml-4 items-start">
                                <div id="name-column" className="text-left flex flex-col md:flex-row w-3/5 items-start">
                                    <div className="md:mr-4 h-full">
                                        <h2 className="text-2xl font-bold">{result.title}</h2>
                                        <StarRating result={result} />
                                        <p className="">Distance: {result.distance}</p>
                                        <p className="">Rating: {result.rating}</p>
                                    </div>
                                </div>
                                <div id="price-column" className="text-right flex flex-col flex-grow w-2/5">
                                    <PriceBox result={result} />
                                    <Features result={result} />
                                </div>
                                <a href="{createUrl(result)}"> To hotel detail page </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;
