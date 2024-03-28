import { LocationDetails, HotelSearchPayload } from '../interfaces/HotelInterfaces';
import HotelSearchApi from './HotelSearchApi';
import { searchQueryFromAi } from '../interfaces/SearchInterfaces';

/**
 * Search service
 * This service shall handle the search query from AI and fetch the hotel data from an API.
 *
 * @note this method contains a few helper that tackle AI sdk or Hotel API behaviors.
 */
class Search {
    constructor(private readonly hotelSearchApi: HotelSearchApi) {
        //
    }

    /**
     * Pre-parsing search text from AI which can be simple text but can be double escaped JSON string
     * that should be parsed twice.
     */
    preParseAiSearchText(searchText: string) {
      let trimmedText = searchText.trim() as string;
      let temp = this.safeParseJson(trimmedText);

      if (!temp) {
        console.error('[S][ppast] Invalid search query:', searchText);

        return null;
      }

      if (typeof temp === 'object') {
        return temp;
      }

      let safetyForJson = this.safeParseJson(temp);

      if (!safetyForJson) {
        console.error('[S][ppast] Invalid search query for re-parsed JSON:', searchText);

        return null;
      }

      const searchQuery: searchQueryFromAi = safetyForJson;

      return searchQuery;
    }

    /**
     * Main fucntion to handle AI parsed hotel reservation text and fetch hotel data from
     * an API then reorder the results to make it React renderable.
     */
    async run(searchText: string) {
      try {
        const searchQuery: searchQueryFromAi | null = this.preParseAiSearchText(searchText);

        if (!searchQuery) {
          return [];
        }

        const { city } = searchQuery;
        const result = await this.hotelSearchApi.getLoginToken();

        if (!result) {
          console.error('[S][r] No login token found for Hotel API.');

          return [];
        }
        const varos = await this.hotelSearchApi.getCityId(searchQuery.city);
        console.log('[S][r] City ID: ', varos);

        if (!varos) {
          console.error('[S][r] No city ID found for city: ', city);

          return [];
        }

        const loc = await this.hotelSearchApi.getCityCoordinates(varos);
        console.log('[S][r] Location: ', loc);

        if (!loc) {
          console.error('[S][r] No location found for city: ', city);

          return [];
        }

        const searchPayload: HotelSearchPayload = this.buildPayload(searchQuery, loc);
        console.log('[S][r] Hotel search payload is: ', searchPayload);

        const hotelSearchRes = await this.hotelSearchApi.searchHotels(searchPayload);
        console.log('[S][r] Hotel search result: ', hotelSearchRes, 'type of result: ', typeof hotelSearchRes);

        if (
          !hotelSearchRes
          || !hotelSearchRes.returnedData 
          || !hotelSearchRes.returnedData.hotels
        ) {
          return [];
        }

        return hotelSearchRes.returnedData.hotels;
      } catch (err) {
        console.error('[S][r] Encountered an error for searching a hotel: ', err);
      }
      return [];
    }

    /**
     * Simple helper to parse a JSON string safely, returns null on error.
     */
    safeParseJson(str: string): any {
      try {
        return JSON.parse(str);
      } catch (e) {
        return null;
      }
    }

    /**
     * Simple helper to determine a text can be parsed or not as JSON.
     */
    isJson(str: string): boolean {
      try {
        JSON.parse(str);
        return true;
      } catch (err) {
        return false;
      }
    }

    /**
     * Helper function to build the search payload for the Hotel API
     *
     * @param {searchQueryFromAi} searchQuery 
     * @param {LocationDetails} location 
     * @returns {HotelSearchPayload}
     */
    buildPayload(searchQuery: searchQueryFromAi, location: LocationDetails): HotelSearchPayload {
      return {
        startDate: searchQuery.from,
        endDate: searchQuery.until,
        roomsCount: `${searchQuery.rooms}`,
        detailed: 1,
        guests: [
          {
            ageCode: 'adult',
            count: 1,
          }
        ],
        latitude: location.Coordinates.lat,
        longitude: location.Coordinates.lng,
        countryCode: location.Country,
      };
    }

    /**
     * Attempt to build a hotel list from a text.
     */
    buildHotelList(hotelSearchRes: string) {
      if (!hotelSearchRes) {
        return [];
      }

      const splitList = this.hotelListSplitter(hotelSearchRes);
      let concated: any[] = [];
      // @note this is a defenisve line against non-regular API endpoint behaviour (sometime empty sometimes not)
      splitList.forEach(item => {
        const itemStr = item.trim();
        const parsed = this.safeParseJson(itemStr);

        if (parsed) {
          concated = [...concated, ...parsed?.returnedData?.hotels];
        }
      });

      return concated;
    }

    /**
     * Helper method to split stringified hotel list from API wich can be empty or two space or just two
     * new line symbol.
     *
     * @param {string} hotelSearchRes 
     * @returns {Array<any>}
     */
    hotelListSplitter(hotelSearchRes: string) {
      try {
        if (!hotelSearchRes) {
          return [];
        }

        return hotelSearchRes.split('\n');
      } catch (err) {
        console.error('[S][hls] Failed to split the hotel list from API, error:', err);
      }

      return [];
    }
  }

export default Search;
