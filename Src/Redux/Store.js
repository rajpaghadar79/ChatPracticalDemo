import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //   storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk),
        process.env.NODE_ENV === 'development' && window.devToolsExtension
            ? window.devToolsExtension()
            : f => f,
    ),
);

export const persistor = persistStore(store);