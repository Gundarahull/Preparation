import { createTool } from "@mastra/core/tools";
import { z } from 'zod'

//lat-long
// https://api.tomtom.com/routing/1/calculateRoute/12.9716,77.5946:17.3850,78.4867/json?key=Fem6eCgttw1GRh8rAOWADZ3HF2TYRaxm



const trafficTool = createTool({
  id: "traffic-tool",
  description: "tells about the traffic and delayed minutes between two places",
  inputSchema: z.object({
    source: z.string().describe("Place name eg: Tirupati"),
    destination: z.string().describe("Place name eg: Hyderabad"),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    source: z.string(),
    destination: z.string(),
    distance: z.string().optional(),
    estimates_travel_time: z.string().optional(),
    traffic_delay_in_seconds: z.string().optional(),
    traffic_length_in_meters: z.string().optional(),
    arrival_time: z.string().optional(),
    error: z.string().optional(),
  }),
  execute: async ({ source, destination }) => {
    try {
      // 1. Fetch Geocoding Coordinates
      const Source_GeoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(source)}&count=1&language=en&format=json`
      );
      const Destination_GeoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1&language=en&format=json`
      );

      const source_data = await Source_GeoResponse.json();
      const destination_data = await Destination_GeoResponse.json();

      if (!source_data.results?.[0] || !destination_data.results?.[0]) {
        return {
          success: false,
          source,
          destination,
          error: "Could not resolve geocoding coordinates for the given locations.",
        };
      }

      const source_lat = source_data.results[0].latitude;
      const source_long = source_data.results[0].longitude;
      const dest_lat = destination_data.results[0].latitude;
      const dest_long = destination_data.results[0].longitude;

      // 2. Query TomTom Routing API
      const traffic_response = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${source_lat},${source_long}:${dest_lat},${dest_long}/json?key=Fem6eCgttw1GRh8rAOWADZ3HF2TYRaxm`
      );

      if (!traffic_response.ok) {
        return {
          success: false,
          source,
          destination,
          error: "Failed to pull metrics from routing servers.",
        };
      }

      const rawData = await traffic_response.json();
      
      // Target the route summary node directly
      const summary = rawData.routes?.[0]?.summary;

      if (!summary) {
        return {
          success: false,
          source,
          destination,
          error: "No routing summary payload found in server response.",
        };
      }

      // 3. Transform and return metrics
      return {
        success: true,
        source,
        destination,
        distance: `${(summary.lengthInMeters / 1000).toFixed(2)} km`,
        estimates_travel_time: `${(summary.travelTimeInSeconds / 60).toFixed(0)} minutes`,
        traffic_delay_in_seconds: `${summary.trafficDelayInSeconds} seconds`,
        traffic_length_in_meters: `${summary.trafficLengthInMeters} meters`,
        arrival_time: summary.arrivalTime, // ISO String returned by the API
        error: undefined,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message || String(error),
        source,
        destination,
      };
    }
  },
});

export default trafficTool;
