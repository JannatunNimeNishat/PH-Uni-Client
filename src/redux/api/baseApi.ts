import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * i. baseApi er modde amra jodi endpoints gula tikte taki taile ai onk gula endpoint ase jabe. 
 * ii. tar jonno amra features er modde aktaSlice er pashapahi  oi sliceApi nam e akta file nibo. aboung oitar modde endPoints gula likbo. 
 * iii. Oi particular sliceApi gula  baseApi.injectEndsPoints e modde tikbo taile auto ai baseApi er modde endpoints gula cole asbe. amder baseApi.ts file tao clean takbe. 
 * iv. !Impotent -> 
 amra backend teka je cookie ta pabo (refresh token) saita amader browser er cookie te save korte hobe. 
 eta korte 2 ta step follow korte hobe:
    
  1st. baseQuery r modde akta new property add korte hobe. 
    credentials:'include' 

   2nd. backend e   app.use(cors({ origin: 'http://localhost:5173', credentials:true })); credentials:true kore dite hobe.
name e tahole acon incoming cookie ta browser er cookies e save hobe. 
 * 
 */
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:5000/api/v1", 
    credentials:'include' 
}),
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
