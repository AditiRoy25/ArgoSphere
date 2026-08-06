import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie";

// =====================================
// BASE QUERY
// =====================================

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,

  // Useful if backend also uses cookies
  credentials: "include",

  // =====================================
  // ATTACH ACCESS TOKEN
  // =====================================

  prepareHeaders: (headers) => {
    const accessToken =
      typeof window !== "undefined"
        ? Cookies.get("accessToken")
        : undefined;

    if (accessToken) {
      headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }

    headers.set(
      "Accept",
      "application/json"
    );

    return headers;
  },
});

// =====================================
// BASE API
// =====================================

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery,

  tagTypes: [
    "Auth",
    "Users",
    "Farm",
    "Seed",
    "Marketplace",
    "Course",
    "NGOs",
    "Report",
    "Contact",
    "Profile",
    "Dashboard",
    "Learning",
    "Notification",
    "Scheme",
    "MyScheme",
    "Help",
    "Farmers",
    "Reports",
    "Ai",
    "Weather",
    "Allowances",
    "Analytics",
    "Statistics",
    "Workshops",
    "MyCourses",
"AdminCourses",
"AdminCourse",
"AdminEnrollments",
"CropCalendar"
  ],

  endpoints: () => ({}),
});