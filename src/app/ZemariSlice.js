import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ZemariAdapter = createEntityAdapter({
    selectId: (entity) => entity._id,
    sortComparer: (a, b) => {
        return b.mezmurs.length-a.mezmurs.length;;
    }
});
const initialState = ZemariAdapter.getInitialState();

export const ZemariApi = createApi({
    reducerPath: "Zemari",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BackEnd }),
    endpoints: (builder) => ({
        getZemaris: builder.query({
            query: () => ({
                url: "/zemari",
               
            }),
            
            transformResponse: (response) => {
              return  ZemariAdapter.setAll(initialState, response.data)
            }
        })


    })

})
export const {useGetZemarisQuery} = ZemariApi;
const selectZemariResult = ZemariApi.endpoints.getZemaris.select();
const selectZemariData = createSelector(selectZemariResult, (ZemariResult) => ZemariResult.data ?? initialState)
export const { selectAll: selectAllZemari,  selectById: selectZemariById } = ZemariAdapter.getSelectors(state => selectZemariData(state))