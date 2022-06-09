import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { 
    persistStore, 
    persistReducer 
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index.js";

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {
    store,
    persistor
}