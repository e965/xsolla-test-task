import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<RootReducerType>;

export default rootReducer;
