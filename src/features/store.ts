import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';

import medicine from './medicine';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'


const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [

  ],
};

const reducers = combineReducers({
    medicine: medicine
});

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
