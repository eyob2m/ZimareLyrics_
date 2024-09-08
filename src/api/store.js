import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MezmurApi } from "../app/MezmurSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ZemariApi } from "../app/ZemariSlice";
import { CategoryApi } from "../app/CategorySlice";
import { RequestApi } from "../app/RequestsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
    [MezmurApi.reducerPath]: MezmurApi.reducer,
    [ZemariApi.reducerPath]: ZemariApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [RequestApi.reducerPath]: RequestApi.reducer,
})
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: [
        MezmurApi.reducerPath,
        ZemariApi.reducerPath,
        CategoryApi.reducerPath,
        RequestApi.reducerPath
    ]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                ],
                ignoredPaths: [
                    'some.nested.path'
                ]
            }
        }).concat(
            MezmurApi.middleware,
            ZemariApi.middleware,
            CategoryApi.middleware,
            RequestApi.middleware
        ),
});


export const persistor = persistStore(store);

setupListeners(store.dispatch)