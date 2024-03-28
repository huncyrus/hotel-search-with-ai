import OpenAI from 'openai';
import Search from './Search';

class AiSearch {
    constructor(private readonly openAI: OpenAI, private readonly search: Search) {
      //
    }

    /**
     * Parses text for details via AI then trigger the Hotel Searcher service
     * based on the details.
     */
    async getOpenAiSearch(query: string): Promise<any> {
        const completion = await this.openAI.chat.completions.create({
            messages: [
              { 
                role: "system", 
                content: "You will be provided with a hotel reservation statement. Your task is to search for a city name, required rooms, and dates in the statement. If the date is missing then use todays date as \"from\" and \"until\" field in the response. The output shoud be JSON, no formatting, in oneline or as object. In the JSON you should have a \"city\", \"rooms\", \"from\" and a \"until\" property. No explanation, no questions, no followups. Anything else that you would like to give, add as a \"note\" field.",
              },
              {
                "role": "user",
                "content": query,
              }
            ],
            model: 'gpt-3.5-turbo-0125',
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
            response_format: { type: "json_object" },
          });
        
          const searchResult = await this.search.run(JSON.stringify(completion.choices[0].message.content));

          return searchResult;
    }
}

export default AiSearch;