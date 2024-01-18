import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * i. baseApi er modde amra jodi endpoints gula tikte taki taile ai onk gula endpoint ase jabe. 
 * ii. tar jonno amra features er modde aktaSlice er pashapahi  oi sliceApi nam e akta file nibo. aboung oitar modde endPoints gula likbo. 
 * iii. Oi particular sliceApi gula  baseApi.injectEndsPoints e modde tikbo taile auto ai baseApi er modde endpoints gula cole asbe. amder baseApi.ts file tao clean takbe. 
 * 
 */
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints:() =>({}),
  /* endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }), */
});
