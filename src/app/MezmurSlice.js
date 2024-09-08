import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MezmurAdapter = createEntityAdapter({
    selectId: (entity) => entity._id,
    sortComparer: (a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
});
const initialState = MezmurAdapter.getInitialState();

export const MezmurApi = createApi({
    reducerPath: "Mezmur",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BackEnd }),
    endpoints: (builder) => ({
        getMezmurs: builder.query({
            query: () => ({
                url: "/zimare",
             
            }),
            
            transformResponse: (response) => {
             
              return  MezmurAdapter.setAll(initialState, response.data)
            }
        })


    })

})
export const {useGetMezmursQuery} = MezmurApi;
const selectMezmurResult = MezmurApi.endpoints.getMezmurs.select();
const selectMezmurData = createSelector(selectMezmurResult, (MezmurResult) => MezmurResult.data ?? initialState)
export const { selectAll: selectAllMezmur, selectById: selectMezmurById } = MezmurAdapter.getSelectors(state => selectMezmurData(state))