import { persistStore, persistReducer } from 'redux-persist';

 // defaults to localStorage for web
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import adminReducer from './reduxReducer/adminReducer';
import authReducer from './reduxReducer/authReducer';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth']
};

const authPersistConfig = {
    key: 'auth',
    storage: storage,
};

const rootReducer = combineReducers({
    admin: adminReducer,
    auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
