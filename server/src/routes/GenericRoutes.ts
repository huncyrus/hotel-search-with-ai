import { Router, Request, Response } from 'express';
const GenericRouter = Router();


/**
 * Root endpoint
 *
 * @api {get} / Root
 * @apiName Root
 * @apiGroup Root
 * @apiSuccess {String} message The welcome message.
 *
 * @openapi
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: This is the root endpoint of the API. It can be used to check if the API is up and running.
 *     responses:
 *       200:
 *         description: The API is up and running.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: API is up and running
 */
GenericRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send('This is a hotel search tool based on TypeScript, React, Tailwind, Express, and OpenAI');
});

export default GenericRouter;