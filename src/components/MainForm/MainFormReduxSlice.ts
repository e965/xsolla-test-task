import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { DataAPI, InsertAPI } from '../../api/services';

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

export const createLetterThunk = createAsyncThunk(`${SliceName}/createLetter`, async (params: Parameters<typeof InsertAPI['createLetter']>[0]) => {
    const response = await InsertAPI.createLetter(params);

    console.groupCollapsed('Запрос /createLetter');
    console.log('params:', JSON.stringify(params));
    console.log('resoinse:', JSON.stringify(response));
    console.groupEnd();

    return response;
});

export const createChatMessageThunk = createAsyncThunk(
    `${SliceName}/createChatMessage`,
    async (params: Parameters<typeof InsertAPI['createChatMessage']>[0]) => {
        const response = await InsertAPI.createChatMessage(params);

        console.groupCollapsed('Запрос /createChatMessage');
        console.log('params:', JSON.stringify(params));
        console.log('resoinse:', JSON.stringify(response));
        console.groupEnd();

        return response;
    }
);

export const createTicketThunk = createAsyncThunk(`${SliceName}/createTicket`, async (params: Parameters<typeof InsertAPI['createTicket']>[0]) => {
    const response = await InsertAPI.createTicket(params);

    console.groupCollapsed('Запрос /createTicket');
    console.log('params:', JSON.stringify(params));
    console.log('resoinse:', JSON.stringify(response));
    console.groupEnd();

    return response;
});

const InitialState: MainFormReduxState = {
    Variables: null,
    CreationPayload: null,
};

const MainFormReduxSlice = createSlice({
    name: SliceName,
    initialState: InitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postDataThunk.fulfilled, (state, action) => {
            state.Variables = action.payload;
        });

        builder.addCase(createLetterThunk.fulfilled, (state, action) => {
            state.CreationPayload = {
                type: 'letter',
                id: action.payload.id,
                timestamp: new Date().toDateString(),
            };
        });

        builder.addCase(createChatMessageThunk.fulfilled, (state, action) => {
            state.CreationPayload = {
                type: 'chat_message',
                id: action.payload.id,
                timestamp: new Date().toDateString(),
            };
        });

        builder.addCase(createTicketThunk.fulfilled, (state, action) => {
            state.CreationPayload = {
                type: 'ticket',
                id: action.payload.id,
                timestamp: new Date().toDateString(),
            };
        });
    },
});

export default MainFormReduxSlice.reducer;
