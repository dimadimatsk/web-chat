import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatSlice from './slices/chatSlice';

const rootReducer = combineReducers({
  user: userSlice,
  chats: chatSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['chats'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
