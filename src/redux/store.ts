import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

/**
 * 1. amra authReducer ke persist kore rakte cai. amra jani reload dile state er data ta clear hoye jai. but amader ai authReducer ba authSlice er state ta refresh clear hole hobe na, jehutu amra user ke bar bar login korabo na. 
 * 2. ai jonno ai authReducer er state ta ke amra persist kore local storage e rekha dibo 'redux-persist' package er maddome. jate reload e state er data ta na jai. 
 * steps:
 * i. import  persistStore, persistReducer
 * ii. create the persistConfig object with key and storage. (key can be any name, storage is the defaults to localStorage for web)
 * iii. now persist our authReducer by calling persistReducer method, which will get 2 arguments persistConfig and authReducer. We are storing this persisted reducer to persistAuthReducer variable. 
 * iv. Inside the store -> reducer object we will pass this persistAuthReducer instead of pervious authReducer
 * v. Now export the persistStore at the very end of this file. -> export const persistor = persistStore(store);
 * vi. And on the main.jsx rap the RouterProvider (rootComponent) with PersistGate component like this ->
 *  <PersistGate loading={null} persistor={persistor}>
         <RouterProvider router={router} />
      </PersistGate>
 */

const persistConfig = {
  key: "auth",
  storage,
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // auth: authReducer,
    auth: persistAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
