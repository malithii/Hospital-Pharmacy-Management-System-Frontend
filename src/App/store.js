import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import loginReducer from "../reducers/loginSlice";
import alertReducer from "../reducers/alertSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loginHPMS: loginReducer,
  alertHPMS: alertReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
