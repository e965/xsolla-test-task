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

export const getInstructionInsertPayload = createSelector<
    RootStateType,
    MainFormReduxState['InstructionInsertPayload'],
    MainFormReduxState['InstructionInsertPayload']
>(
    state => state.mainForm.InstructionInsertPayload,
    InstructionInsertPayload => InstructionInsertPayload
);

export const getActivityInsertPayload = createSelector<
    RootStateType,
    MainFormReduxState['ActivityInsertPayload'],
    MainFormReduxState['ActivityInsertPayload']
>(
    state => state.mainForm.ActivityInsertPayload,
    ActivityInsertPayload => ActivityInsertPayload
);

export const getTriggerInsertPayload = createSelector<
    RootStateType,
    MainFormReduxState['TriggerInsertPayload'],
    MainFormReduxState['TriggerInsertPayload']
>(
    state => state.mainForm.TriggerInsertPayload,
    TriggerInsertPayload => TriggerInsertPayload
);

export const getSubmitedFormData = createSelector<RootStateType, MainFormReduxState['SubmitedFormData'], MainFormReduxState['SubmitedFormData']>(
    state => state.mainForm.SubmitedFormData,
    SubmitedFormData => SubmitedFormData
);

export const getIsFormSubmitPending = createSelector<
    RootStateType,
    MainFormReduxState['IsFormSubmitPending'],
    MainFormReduxState['IsFormSubmitPending']
>(
    state => state.mainForm.IsFormSubmitPending,
    IsFormSubmitPending => IsFormSubmitPending
);
