import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RequestAdapter = createEntityAdapter({
    selectId: (entity) => entity._id,
    sortComparer: (a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
});
const initialState = RequestAdapter.getInitialState();


export const RequestApi = createApi({
    reducerPath: "Request",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BackEnd }),
    endpoints: (builder) => ({
        getRequests: builder.query({
            query: () => ({
                url: "/",
             
            }),
            
            transformResponse: (response) => {
              return  RequestAdapter.setAll(initialState, response.data)
            }
        }),
        addMezmur: builder.mutation({
            query: (body) => ({
                url: "/requests",
                method: "POST",
                body: body 
            }),
            transformErrorResponse: (response) => {
                return RequestAdapter.setAll(initialState, response.data)
            }
        })


    })

})
export const {useGetRequestsQuery, useAddMezmurMutation} = RequestApi;
const selectRequestResult = RequestApi.endpoints.getRequests.select();
const selectRequestData = createSelector(selectRequestResult, (RequestResult) => RequestResult.data ?? initialState)
export const { selectAll: selectAllRequest, selectById: selectRequestById } = RequestAdapter.getSelectors(state => selectRequestData(state))