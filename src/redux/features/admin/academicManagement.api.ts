import { TQueryParam, TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      // data jokohn base hoye jabe tokon caile amra data ta ke transform kore amader moto kore nite pari. necessary data ke neya
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => {
        console.log("data inside api:", data);
        return {
          url: "/academic-faculties/create-academic-faculty",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAcademicSemester: builder.query({
      query: (args) => {
       // const params = new URLSearchParams();
        return {
          url: "/academic-faculties",
          method:"GET"
        };
      },
    }),
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useAddAcademicSemestersMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicSemesterQuery
} = academicManagement;
