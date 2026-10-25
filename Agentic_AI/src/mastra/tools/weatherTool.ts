//API - https://geocoding-api.open-meteo.com/v1/search?name=bangalore&count=1

import { createTool } from "@mastra/core/tools";

import { z } from "zod"
//TOM TOM > Fem6eCgttw1GRh8rAOWADZ3HF2TYRaxm


// https://api.tomtom.com/routing/1/calculateRoute/77.7499,12.9698:77.5712,12.43872/json?vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=Fem6eCgttw1GRh8rAOWADZ3HF2TYRaxm
// /77.7499,12.9698:77.5712,12.9766/json




export const weatherTool = createTool({
  id: 'weather-tool',
  description: 'Fetches weather for a location', 
  inputSchema: z.object({
    city: z.string().describe("City Name, eg: Bangalore, Hyderabad")
  }),
  outputSchema: z.object({
    city: z.string(),
    temperature: z.string(),
    error: z.string().optional()
  }),

  execute: async ({ city }) => {
    // const { city } = input;

    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);

      console.log("Watehr----",geoResponse);
      
      if (!geoResponse.ok) {
        return {
          city: city,
          temperature: "Not found",
          error: "Failed to connect to the geocoding service networks."
        };
      }

      const data = await geoResponse.json();

      console.log("--Data---",data);
      

      // 2. ✅ Fixed: Safety guard check to catch typos or invalid city search arrays safely
      if (!data.results || data.results.length === 0) {
        return {
          city: city,
          temperature: "Not found",
          error: "Please send a valid City name. No matching coordinates found."
        };
      }

      const lat = data.results[0].latitude;
      const long = data.results[0].longitude;

      // 3. ✅ Updated: Streamlined the endpoint params to fetch only what you actually need
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`);

      if (!weatherResponse.ok) {
        return {
          city: city,
          temperature: "Not found",
          error: "Failed to pull metrics from weather forecasting servers."
        };
      }

      const tempData = await weatherResponse.json();

      // 4. ✅ Fixed: Extract the raw value and append the unit symbol string cleanly
      const temp = `${tempData.current.temperature_2m}°C`;

      return {
        city: data.results[0].name, // Uses the neatly formatted matched name
        temperature: temp,
        error: undefined 
      };

    } catch (error: any) {
      console.error("Runtime exception inside weather tool logic:", error);
      return {
        city: city,
        temperature: "Not found",
        error: error?.message || "An unexpected processing error occurred."
      };
    }
  }
});


