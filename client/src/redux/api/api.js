import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../../constants/api";


const stationApi = createApi({
  reducerPath: "stationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/`,
    credentials: "include", 
  }),
  tagTypes: ['Station'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "user/register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        credentials:'include'
      }),
    }),
    myProfile: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
        credentials:'include'
      }),
      keepUnusedDataFor: 0,
    }),
    createStation: builder.mutation({
      query: (body) => ({
        url: "station/",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Station'], 
    }),
    getAllStation: builder.query({
      query: () => ({
        url: "station/",
        method: "GET",
      }),
      providesTags: ['Station'],
    }),
    updateStation: builder.mutation({
      query: ({body,id}) => ({
        url: `station/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Station'], 
    }),
     deleteStation: builder.mutation({
      query: (id) => ({
        url: `station/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Station'], 
    }),
    getStationById: builder.query({
    query: (id) => ({
      url: `station/${id}`,
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: 'Station', id }],
  }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMyProfileQuery,
  useGetAllStationQuery,
  useCreateStationMutation,
  useDeleteStationMutation,
  useUpdateStationMutation,
  useGetStationByIdQuery
} = stationApi;

export default stationApi;
