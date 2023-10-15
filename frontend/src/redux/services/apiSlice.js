import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../static/server';

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            const shopToken = getState().shopAuth.shopToken;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            if (shopToken) {
                headers.set('ShopAuthorization', `Bearer ${shopToken}`)
            }
            return headers;
        },
        credentials: "include",
    }),
    tagTypes:['Auth', 'User', 'Products', 'CartItems', 'Wishlist', 'Orders', 'AddressBook', 'Shop', 'ShopProducts', 'ShopCoupons', 'Coupons', 'Events', ],
    endpoints: (builder) => ({ }),
});

export default appApi;