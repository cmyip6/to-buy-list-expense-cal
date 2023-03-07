import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from 'redux-logger';
import authReducer, { AuthState } from "./redux/auth/slice";
import toBuyListReducer, { ToBuyListState } from "./redux/toBuyList/slice";

export interface IRootState {
    toBuyList: ToBuyListState, 
    auth: AuthState,
}

const rootReducer = combineReducers({
    toBuyList: toBuyListReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;