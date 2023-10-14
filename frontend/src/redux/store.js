import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from  'redux-persist/lib/storage';
import appApi from "./services/apiSlice";
import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import userReducer from './features/user/userSlice';
import checkoutReducer from './features/checkout/checkoutSlice';
import shopAuthReducer from './features/shopAuth/shopAuthSlice';
import shopReducer from './features/shop/shopSlice';


const rootReducer = combineReducers({ 
    auth: authReducer,
    products: productsReducer,
    user: userReducer,
    checkout: checkoutReducer,
    shopAuth: shopAuthReducer,
    shop: shopReducer,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
    version: 1,
    whitelist: ['auth', 'shopAuth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(appApi.middleware)
});

export const persistor = persistStore(store)

export default store;