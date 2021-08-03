import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { DataAPI } from '../../api/services';

import type { MainFormReduxState } from './MainFormTypes';

const SliceName = 'MainForm';

export const postDataThunk = createAsyncThunk(`${SliceName}/postData`, async (params: Parameters<typeof DataAPI['postData']>[0]) => {
    const response = await DataAPI.postData(params);

    console.groupCollapsed('Запрос /data');
    console.log('params:', JSON.stringify(params));
    console.log('resoinse:', JSON.stringify(response));
    console.groupEnd();

    return response;
});

const InitialState: MainFormReduxState = {
    Variables: null,
};

const MainFormReduxSlice = createSlice({
    name: SliceName,
    initialState: InitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postDataThunk.fulfilled, (state, action) => {
            state.Variables = action.payload;
        });
    },
});

export default MainFormReduxSlice.reducer;
