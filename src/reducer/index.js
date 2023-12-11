import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import sessionStorage from "redux-persist/es/storage/session";
import authentication from "./authentication";

const rootPersistConfig = {
    key: "root",
    storage: storage,
    blacklist: ['session']
}

const sessionPersistConfig = {
    key: "session",
    storage: sessionStorage,
}

const rootReducer = combineReducers({
    session: persistReducer(sessionPersistConfig, authentication),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;