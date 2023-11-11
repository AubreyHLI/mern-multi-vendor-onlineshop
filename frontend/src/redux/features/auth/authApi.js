import appApi from "../../services/apiSlice";

const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users/signup',
                method: 'POST',
                body: user
            })
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'GET',
            }),
            invalidatesTags: ["User", "CartItems", "Wishlist", "AddressBook"]
        }), 
        getUser: builder.query({
            query: () => '/users/getUser',
            providesTags: ["User"],
        }),
        updateUserInfo: builder.mutation({
            query: (userInfo) => ({
                url: '/users/updateUserInfo',
                method: 'PATCH',
                body: userInfo
            }),
            invalidatesTags: ["User"],
        }),
        updateUserPw: builder.mutation({
            query: (password) => ({
                url: '/users/updatePassword',
                method: 'PATCH',
                body: password
            })
        }),
    })
})

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useUpdateUserInfoMutation,
    useUpdateUserPwMutation,
} = authApi;

export default authApi;