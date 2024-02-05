import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

/** BASEQUERY indifferent page
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

/**send AccessToken on every api request
 * i. amra baseQuery ke bahire neya asci baseApi teka.
 * ii. fetchBaseQuery r modde akta new property prepareHeaders add korci.
 * iii.prepareHeaders er callback  argument hishabe headers,{getState} ney. tar pore inside this call back getState()
 * function deya current auth state teka auth.token ta ber kora ane token variable e assign kore dici.
 * iv. acon token jodi take tahole amra headers er modde token take ke 'authorization' `${token}` deya set kore disci
 *
 */

/**AccessToken expire hoye gela RefreshToken deya call kora
 * i. amra new akta layer create koreci. acon direct baseApi teka baseQuery ke call na kore baseQueryWithRefreshToken function deya call kora hosce. -> baseQuery: baseQueryWithRefreshToken, 
 * ii. baseQueryWithRefreshToken function argument hishbe args,api, extraOptions nisce. ei function ta baseQuery ke call kore tar result ta ke akta veriable e save korte ce. -> const result = await baseQuery(args,api, extraOptions);
 * 
 ******* baseQueryWithRefreshToken
 * i. baseQuery joid 401 response dey. tahole amra akta refresh-token api ke fetch deya call korbo. 
 * ii. refresh-token api input e cookies teka refresh token ney.tai arma acan e credentials:'include' korteci.
 * iii.refresh-token api er response e akta new accessToken asbe. acon amader kaj hosce ai accessToken ke authState er token e set kora r agr user er data ke auth state teka neya abar auth state e set kora.
  api.dispatch(setUser({
      user,
      token:data?.data?.accessToken
    }));
 * iv. r sobar last e abar baseQuery ke call kora. Tar mane acon amra new je accessToken ta pasci saita deya call korteci sobr 1st e je api e 401 error astecilo. ->  result = baseQuery(args,api, extraOptions);
 */

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // to save the cookie
  prepareHeaders: (headers, { getState }) => {
    // assigning the accessToken for every api called. inside the headers authorization
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  // query gular response er upor vitti kore amra action nibo ei jonno ai layer ta create kora hoyce. axios interceptor er moto.
  let result = await baseQuery(args, api, extraOptions);
  //console.log(result);

  // if user not found
  if (result?.error?.status === 404) {
    toast.error(result?.error?.data?.message);
  }

  if (result?.error?.status === 401) {
    //* Send Refresh token
    console.log("sending refresh token");
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      credentials: "include", // refersh token ta ase cookie er modde so -> credentials:'include'
      method: "POST",
    });
    const data = await res.json();
    console.log(data);
    if (data?.data?.accessToken) {
      //console.log(data);
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh-token jodi na ase response e. authoba refresh-token expire hosce jai. taile amra re-direct kore login e pathia dibo.
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: baseQuery,
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),

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
