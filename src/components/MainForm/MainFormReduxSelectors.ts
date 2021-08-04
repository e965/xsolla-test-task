import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../redux/rootReducer';
import type { MainFormReduxState } from './MainFormTypes';

export const getVariables = createSelector<RootStateType, MainFormReduxState['Variables'], MainFormReduxState['Variables']>(
    state => state.mainForm.Variables,
    Variables => Variables
);

export const getVariablesKeys = createSelector<RootStateType, MainFormReduxState['Variables'], string[]>(getVariables, Variables => {
    return Object.keys(Variables ?? {});
});

export const getCreationPayload = createSelector<RootStateType, MainFormReduxState['CreationPayload'], MainFormReduxState['CreationPayload']>(
    state => state.mainForm.CreationPayload,
    CreationPayload => CreationPayload
);
