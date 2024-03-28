interface Location {
    lat: number;
    lng: number;
}
  
interface CachedData {
    _id: {
      $oid: string;
    };
    PROPERTY_CODE: string;
    CHAIN: string;
    CITY: string;
    PROPERTY_IDENTIFIER: string;
    CHAIN_NAME: string;
    PROPERTY_NAME: string;
    LOCATION: string;
    TRANSPORTATION: string;
    ADRESS_LINE_1: string;
    ADRESS_LINE_2: string;
    CITY2: string;
    STATE_CODE: string;
    ZIP_CODE: string;
    COUNTRY_NAME: string;
    COUNTRY_CODE: string;
    PHONE: string;
    FAX: string;
    LOCALRATING: string;
    SELFRATING: string;
    LATITUDE: number;
    LONGITUDE: number;
    DUPE_POOL_ID: string;
    PROVIDER_VALUE: string;
    LAST_UPDATE_TIMESTAMP: string;
    location: Location;
}

// Represents a Hotel entry
export interface Result {
    id: string;
    chainName: string;
    hotelCode: string;
    cityCode: string;
    chainCode: string;
    title: string;
    price: number;
    totalPrice: number;
    localCurrency: string;
    localTotalPrice: string;
    price_includes_tax: boolean;
    stars: number;
    rating: number;
    users_rating_count: number;
    outside_company_policy: boolean;
    free_rooms: number;
    location: string;
    address: null | string;
    image: string;
    amenities: string[];
    breakfastIncluded: string;
    freeCancellationDeadline: string;
    cancellationType: string;
    freeWifi: boolean;
    size: null | string;
    center: Location;
    additional_images: string[];
    rooms: any[]; // Replace 'any' with the actual type if available
    text: null | string;
    distance: number;
    isNegotiatedFare: boolean;
    isDealFare: boolean;
    ratePlanCode: string;
    policyRatePlanCode: null | string;
    environmentallyFriendly: boolean;
    CachedData: CachedData;
    pricePerNight: number;
    pricePerRoomAndNight: number;
    isCollectiveAgreement: boolean;
    phone: string;
    fax: string;
    cached: boolean;
    countryCode: string;
    exceedsPolicy: boolean;
}

export interface ResultsProps {
    results: Result[];
}

