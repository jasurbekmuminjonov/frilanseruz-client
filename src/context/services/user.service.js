import { apiSlice } from "./api.service";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setUserData: builder.mutation({
            query: (body) => ({
                url: "/update",
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["user"]
        }),
        addItemToPortfolio: builder.mutation({
            query: (body) => ({
                url: "/portfolio",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["user"]
        }),
        removeItemFromPortfolio: builder.mutation({
            query: (item_id) => ({
                url: `/portfolio/${item_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        }),
        updatePortfolioItem: builder.mutation({
            query: ({ item_id, body }) => ({
                url: `/portfolio/${item_id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['user'],
        }),
        getUser: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        getByUsername: builder.query({
            query: (username) => ({
                url: `/get/${username}`,
                method: "GET",
            }),
            providesTags: ["user"]
        })
    }),
    overrideExisting: false,
});

export const {
    useSetUserDataMutation,
    useAddItemToPortfolioMutation,
    useRemoveItemFromPortfolioMutation,
    useUpdatePortfolioItemMutation,
    useGetUserQuery,
    useGetByUsernameQuery
} = userApi;
