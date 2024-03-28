import axios from 'axios';
import {
    HotelSearchPayload,
    LocationDetails,
    SearchConfig,
    HotelSearchResponse,
} from '../interfaces/HotelInterfaces';


class HotelSearchApi {
    /**
     * Configuration for the API
     *
     * @var {SearchConfig}
     */
    private config_: SearchConfig;

    /**
     * Access token for the API
     * @var {string}
     */
    private accessToken_: string;

    constructor (config: SearchConfig) {
        this.config_ = config;
        this.accessToken_ = '';
    }

    /**
     * Attempt to retrieve a login token from the API
     *
     * @throws {Error} if the request fails
     * @returns {string} the access token
     */
    async getLoginToken(): Promise<string> {
        const loginUrl = new URL(this.config_.loginPath, this.config_.baseUrl).href;
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.config_.apiKey,
                password: this.config_.apiSecret,
                selectedCompanyId: null,
            }),
        });

        if (!response.ok) {
            console.error('[HSA][glt] Failed to get login token:', response.statusText);

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.accessToken_ = data.access_token; // @todo remove this line when the main function is done

        return data.access_token;
    }

    /**
     * Retrieves an ID for a city. This ID can be used to retrieve coordinates
     *
     * @param {string} cityName 
     * @returns {string}
     */
    async getCityId(cityName: string): Promise<string> {
        console.log('[HSA][gci] City name: ', cityName);
        const locationName = encodeURIComponent(cityName.trim());
        const urlPath = `${this.config_.locationIdPath}${locationName}`;
        const endPoint = new URL(urlPath, this.config_.baseUrl).href;
        console.log('[HSA][gci] EndPoint for getCityId:', endPoint);
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': this.accessToken_,
            },
        });

        if (!response.ok) {
            console.error('[HSA][gci] Failed to search hotels:', response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('[HSA][gci] The city list is not an array:', data);

            throw new Error('Invalid response data.');
        }

        return data[0].Id;
    }

    /**
     * Retrieves the coordinates for a city
     *
     * @param {string} cityId 
     * @returns {LocationDetails}
     */
    async getCityCoordinates(cityId: string): Promise<LocationDetails> {
        const urlPath = `${this.config_.coordinatesPath}${cityId}`;
        const endPoint = new URL(urlPath, this.config_.baseUrl).href;
        console.log('[HSA][gcc] EndPoint for coordinates:', endPoint);
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': this.accessToken_,
            }
        });

        if (!response.ok) {
            console.error('[HSA][gcc] Failed to search hotels:', response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Search for hotels by the given query
     *
     * @param {HotelSearchPayload} query 
     * @returns {Array<object>} hotel list with details
     * @throws {Error} if the fetch fails
     */
    async searchHotels (query: HotelSearchPayload): Promise<HotelSearchResponse> {
        const searchUrl = new URL(this.config_.searchPath, this.config_.baseUrl).href;
        console.log('[HSA][sh] Endpoint for hotel search: ', searchUrl);
        console.log('[HSA][sh] Query: ', query, typeof query);
        const accessToken = this.accessToken_;
        const response = await axios({
            method: 'POST',
            url: searchUrl,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': accessToken,
            },
            data: query,
            timeout: 8000,
        });
        const data = response.data;
        console.log('[HSA][sh] Hotel search header: ', response.headers);
        console.log('[HSA][sh] Hotel search status: ', response.status);
        console.log('[HSA][sh] Hotel search data: ', data);

        return data;
    }
}

export default HotelSearchApi;