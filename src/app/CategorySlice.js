import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CategoryAdapter = createEntityAdapter({
    selectId: (entity) => entity._id,
    sortComparer: (a, b) => {
        return  b.mezmurs.length-a.mezmurs.length;
    }
});
const initialState = CategoryAdapter.getInitialState();

export const CategoryApi = createApi({
    reducerPath: "Category",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BackEnd }),
    endpoints: (builder) => ({
        getCategorys: builder.query({
            query: () => ({
                url: "/category",

            }),
            
            transformResponse: (response) => {
              return  CategoryAdapter.setAll(initialState, response.data)
            }
        })


    })

})
export const {useGetCategorysQuery} = CategoryApi;
const selectCategoryResult = CategoryApi.endpoints.getCategorys.select();
const selectCategoryData = createSelector(selectCategoryResult, (CategoryResult) => CategoryResult.data ?? initialState)
export const { selectAll: selectAllCategory, selectById: selectCategoryById } = CategoryAdapter.getSelectors(state => selectCategoryData(state))