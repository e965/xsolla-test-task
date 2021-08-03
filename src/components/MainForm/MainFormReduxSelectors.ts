import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../redux/rootReducer';
import type { MainFormReduxState } from './MainFormTypes';

export const getVariables = createSelector<RootStateType, MainFormReduxState['Variables'], MainFormReduxState['Variables']>(
    state => state.mainForm.Variables,
    Variables => Variables
);
