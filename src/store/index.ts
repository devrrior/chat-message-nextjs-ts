import {configureStore} from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
    reducer: {
        chat: chatReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;