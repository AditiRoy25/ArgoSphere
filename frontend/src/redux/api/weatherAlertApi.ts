import {
  baseApi,
} from "./baseApi";

import type {
  WeatherAlertsResponse,
  WeatherAlertResponse,
} from "@/src/types/weatherAlert";

// ==========================================
// WEATHER ALERT API
// ==========================================

export const weatherAlertApi =
  baseApi.injectEndpoints({

    endpoints: (builder) => ({

      // ======================================
      // GET ALL WEATHER ALERTS
      // ======================================

      getWeatherAlerts:
        builder.query<
          WeatherAlertsResponse,
          void
        >({

          query: () => ({
            url: "/weather",
            method: "GET",
          }),

          providesTags: [
            "Weather",
          ],

        }),

      // ======================================
      // GET DISTRICT WEATHER ALERTS
      // ======================================

      getDistrictWeatherAlerts:
        builder.query<
          WeatherAlertsResponse,
          string
        >({

          query: (district) => ({

            url:
              `/weather/district/${encodeURIComponent(
                district
              )}`,

            method: "GET",

          }),

          providesTags: [
            "Weather",
          ],

        }),

      // ======================================
      // GET SINGLE WEATHER ALERT
      // ======================================

      getWeatherAlert:
        builder.query<
          WeatherAlertResponse,
          string
        >({

          query: (id) => ({

            url: `/weather/${id}`,

            method: "GET",

          }),

          providesTags:
            (
              _result,
              _error,
              id
            ) => [

              {
                type: "Weather",
                id,
              },

            ],

        }),

    }),

  });

// ==========================================
// EXPORT HOOKS
// ==========================================

export const {

  useGetWeatherAlertsQuery,

  useGetDistrictWeatherAlertsQuery,

  useGetWeatherAlertQuery,

} = weatherAlertApi;