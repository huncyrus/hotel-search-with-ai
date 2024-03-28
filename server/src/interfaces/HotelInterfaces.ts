/**
 * Configuration for the search API
 */
export interface SearchConfig {
    apiKey: string;
    apiSecret: string;
    baseUrl: string;
    searchPath: string;
    detailsPath: string;
    loginPath: string;
    coordinatesPath: string;
    locationIdPath: string;
}

/**
 * Response for API auth
 */
export interface LoginResponse {
    access_token: string;
    name: string;
    refresh_token: string;
    companyId: string;
    expiry: number;
    url: string;
}

export interface HotelSearchPayloadGuest {
    ageCode: string;
    count: number;
}
/**
 * Payload for searching hotels
 */
export interface HotelSearchPayload {
    startDate: string;
    endDate: string;
    roomsCount: string;
    detailed: number;
    guests: HotelSearchPayloadGuest[];
    latitude: number;
    longitude: number;
    countryCode: string;
}

/**
 * Coordinates for a city location
 */
export interface Coordinates {
    lat: number;
    lng: number;
}

/**
 * Details for a location (city)
 * These details will be used for searching hotels
 */
export interface LocationDetails {
    Location: string;
    Country: string;
    Coordinates: Coordinates;
}

export interface HotelSearchResponse {
    returnedData: {
        hotels: any[];
    };
}