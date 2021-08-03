import { combineReducers } from '@reduxjs/toolkit';

import mainFormReducer from '../components/MainForm/MainFormReduxSlice';

const rootReducer = combineReducers({
    mainForm: mainFormReducer,
});

type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<RootReducerType>;

export default rootReducer;
