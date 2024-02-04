import { baseApi } from "../../api/baseApi";

const academicManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      // data jokohn base hoye jabe tokon caile amra data ta ke transform kore amader moto kore nite pari. necessary data ke neya
      transformResponse:(response)=>{
        return {
          data:response.data,
          meta:response.meta
        }
      }
    }),
    addAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useAddAcademicSemestersMutation,
} = academicManagement;
