import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DataAPI, InsertAPI } from '../../api/services';

import type { MainFormReduxState } from './MainFormTypes';

const SliceName = 'MainForm';

export const postDataThunk = createAsyncThunk(`${SliceName}/postData`, async (params: Parameters<typeof DataAPI['postData']>[0]) => {
    const response = await DataAPI.postData(params);

    console.groupCollapsed('Запрос /data');
    console.log('params:', JSON.stringify(params));
    console.log('response:', JSON.stringify(response));
    console.groupEnd();

    return response;
});

export const insertInstructionThunk = createAsyncThunk(
    `${SliceName}/insertInstruction`,
    async (args: { params: Parameters<typeof InsertAPI['insertInstruction']>[0]; formData: MainFormReduxState['SubmitedFormData'] }) => {
        const response = await InsertAPI.insertInstruction(args.params);

        console.groupCollapsed('Запрос /insert/instruction');
        console.log('params:', JSON.stringify(args.params));
        console.log('formData:', JSON.stringify(args.formData));
        console.log('response:', JSON.stringify(response));
        console.groupEnd();

        return {
            response,
            formData: args.formData,
        };
    }
);

export const insertActivityThunk = createAsyncThunk(
    `${SliceName}/insertActivity`,
    async (params: Parameters<typeof InsertAPI['insertActivity']>[0]) => {
        const response = await InsertAPI.insertActivity(params);

        console.groupCollapsed('Запрос /insert/activity');
        console.log('params:', JSON.stringify(params));
        console.log('response:', JSON.stringify(response));
        console.groupEnd();

        return response;
    }
);

export const insertTriggerThunk = createAsyncThunk(`${SliceName}/insertTrigger`, async (params: Parameters<typeof InsertAPI['insertTrigger']>[0]) => {
    const response = await InsertAPI.insertTrigger(params);

    console.groupCollapsed('Запрос /insert/trigger');
    console.log('params:', JSON.stringify(params));
    console.log('response:', JSON.stringify(response));
    console.groupEnd();

    return response;
});

const InitialState: MainFormReduxState = {
    Variables: null,
    InstructionInsertPayload: null,
    ActivityInsertPayload: null,
    TriggerInsertPayload: null,
    SubmitedFormData: null,
    IsFormSubmitPending: false,
};

const MainFormReduxSlice = createSlice({
    name: SliceName,
    initialState: InitialState,
    reducers: {
        resetReduxState: (state, payload: PayloadAction<void>) => {
            state.Variables = null;
            state.InstructionInsertPayload = null;
            state.ActivityInsertPayload = null;
            state.TriggerInsertPayload = null;
            state.SubmitedFormData = null;
            state.IsFormSubmitPending = false;
        },
        resetQueryPayloads: (state, payload: PayloadAction<void>) => {
            state.InstructionInsertPayload = null;
            state.ActivityInsertPayload = null;
            state.TriggerInsertPayload = null;
            state.SubmitedFormData = null;
            state.IsFormSubmitPending = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(postDataThunk.fulfilled, (state, action) => {
            state.Variables = action.payload;
        });

        builder.addCase(insertInstructionThunk.pending, (state, action) => {
            state.IsFormSubmitPending = true;
        });
        builder.addCase(insertInstructionThunk.fulfilled, (state, action) => {
            state.InstructionInsertPayload = {
                ...action.payload.response,
                timestamp: new Date().toISOString(),
            };
            state.SubmitedFormData = action.payload.formData;
        });
        builder.addCase(insertInstructionThunk.rejected, (state, action) => {
            state.IsFormSubmitPending = false;
            console.warn(action.error);
        });

        builder.addCase(insertActivityThunk.fulfilled, (state, action) => {
            state.ActivityInsertPayload = {
                ...action.payload,
                timestamp: new Date().toISOString(),
            };
        });
        builder.addCase(insertActivityThunk.rejected, (state, action) => {
            state.IsFormSubmitPending = false;
            console.warn(action.error);
        });

        builder.addCase(insertTriggerThunk.fulfilled, (state, action) => {
            state.IsFormSubmitPending = true;
            state.TriggerInsertPayload = {
                ...action.payload,
                timestamp: new Date().toISOString(),
            };
        });
        builder.addCase(insertTriggerThunk.rejected, (state, action) => {
            state.IsFormSubmitPending = false;
            console.warn(action.error);
        });
    },
});

export const { resetReduxState, resetQueryPayloads } = MainFormReduxSlice.actions;

export default MainFormReduxSlice.reducer;
