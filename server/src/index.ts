import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import OpenAI from "openai";
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import SwaggerOutput from './swagger_output';
import GenericRouter from './routes/GenericRoutes';
import { Cache } from './services/Cache';
import HotelSearchApi from './services/HotelSearchApi';
import { SearchConfig, LocationDetails, HotelSearchPayload } from './interfaces/HotelInterfaces';
import Search from './services/Search';
import Suggestions from './services/Suggestions';
import AiSearch from './services/AiSearch';

dotenv.config({ path: path.resolve(__dirname, '../.env')});
const app: Express = express();
const port = 3001;
app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(corsOptions));

// Credentials for OpenAi
const openAiSecret = process.env.OPENAI_API_KEY;
const openAiOrganizationId = process.env.OPENAI_ORGANIZATION_KEY;

if (!openAiSecret || !openAiOrganizationId) {
  console.error('[main] Missing required environment variables for OpenAI');
  process.exit(1);
}

const openai = new OpenAI({
  organization: openAiOrganizationId,
  apiKey: openAiSecret,
});

// In-memory cache for auto suggestion
const cache = new Cache<any>();

// Hotel search api
const hotelBaseApi = process.env.HOTEL_API_BASE_URL;
const hotelLoginPath = process.env.HOTEL_API_LOGIN_PATH;
const hotelCoordinatesPath = process.env.HOTEL_API_COORDINATES_PATH;
const hotelSearchPath = process.env.HOTEL_API_SEARCH_PATH;
const hotelApiKey = process.env.HOTEL_API_AUTH_KEY;
const hotelApiSecret = process.env.HOTEL_API_AUTH_PASS;
const hotelLocationPath = process.env.HOTEL_API_LOCATION_ID_PATH;

if (
  !hotelBaseApi 
  || !hotelLoginPath 
  || !hotelCoordinatesPath 
  || !hotelSearchPath 
  || !hotelApiKey 
  || !hotelApiSecret
  || !hotelLocationPath
) {
  console.error('[main] Missing required environment variables for Hotel Search API');
  process.exit(1);
}
const hotelCfg: SearchConfig = {
  baseUrl: hotelBaseApi,
  loginPath: hotelLoginPath,
  coordinatesPath: hotelCoordinatesPath,
  searchPath: hotelSearchPath,
  apiKey: hotelApiKey,
  apiSecret: hotelApiSecret,
  detailsPath: '',
  locationIdPath: hotelLocationPath,
}

const hotelSearchApi = new HotelSearchApi(hotelCfg);
const search = new Search(hotelSearchApi);
const suggestions = new Suggestions(openai, cache);
const aiSearch = new AiSearch(openai, search);

// For swagger api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerOutput));
app.use('/', GenericRouter);

/**
 * Search endpoint
 *
 * @api {post} /api/search Search for hotels
 * @apiName Search
 * @apiGroup Search
 * @apiVersion 1.0.0
 * @apiBody {String} query The search query. OpenAi assistant shall process it.
 * @apiSuccess {Object[]} results The search results as array.
 * @apiError {String} error The error message. 500 Internal server error.
 *
 * @openapi
 * /api/search:
 *   post:
 *     summary: Search for hotels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: The search query. OpenAi assistant shall process it.
 *     responses:
 *       200:
 *         description: The search results as array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
app.post('/api/search', async (req: Request, res: Response) => {
  const { query } = req.body;
  try {
   const searchResult = await aiSearch.getOpenAiSearch(query);

    res.status(200).json(searchResult);
  } catch (error) {
    console.error('[main][/api/search] Error fetching suggestions from OpenAI:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Suggestion endpoint for autocompletion
 *
 * @api {post} /suggestions Get suggestions for a city based on the last word
 * @apiName Suggestions
 * @apiVersion 1.0.0
 * @apiGroup Search
 * @apiBody {String} input The input string to get suggestions for.
 * @apiSuccess {Object} suggestions The suggestions object from OpenAI.
 * @apiError {String} error The error message. 500 Internal server error.
 *
 * @openapi
 * /suggestions:
 *   get:
 *     summary: Get suggestions
 *     description: This endpoint provides suggestions based on the provided query.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query to get suggestions for.
 *     responses:
 *       200:
 *         description: A list of suggestions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
app.post('/suggestions', async (req: Request, res: Response) => {
  const { input } = req.body;
  
   try {
    const suggestionsResult = await suggestions.getSuggestions(input);
    console.log('[main][/suggestions] Suggestions result is: ', suggestionsResult);

    res.status(200).json(suggestionsResult);
  } catch (error) {
    console.error('[main][/suggestions] Error fetching suggestions from OpenAI:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`[main] Server running at http://localhost:${port}`);
});
