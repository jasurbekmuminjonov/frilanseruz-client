import { apiSlice } from "./api.service";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setUserData: builder.mutation({
            query: (body) => ({
                url: "/update",
                method: "PUT",
                body: body
            })
        }),
        addItemToPortfolio: builder.mutation({
            query: (body) => ({
                url: "/portfolio",
                method: "POST",
                body: body,
            })
        }),
        removeItemFromPortfolio: builder.mutation({
            query: (item_id) => ({
                url: "/portfolio",
                method: "DELETE",
                params: {
                    item_id
                }
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            })
        })
    }),
    overrideExisting: false,
});

export const {
    useSetUserDataMutation,
    useAddItemToPortfolioMutation,
    useRemoveItemFromPortfolioMutation,
    useGetUserQuery
} = userApi;
