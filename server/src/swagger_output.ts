/**
 * Converted JSON to TS to build Swagger documentation.
 */
const SwaggerOptions = {
  "openapi": "3.0.0",
  "info": {
    "version": "v1.0.0",
    "title": "Hotel Search API",
    "description": "Hotel Search API with OpenAi integration."
  },
  "servers": [
    {
      "url": "http://localhost:3001",
      "description": "Hotel Search API backend"
    }
  ],
  "paths": {
    "/": {
      "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/search": {
      "post": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/suggestions": {
      "post": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "input": {
                    "example": "any"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  }
};

export default SwaggerOptions;
