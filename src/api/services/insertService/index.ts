import { query } from '../..';
import { getRandomArbitrary } from '../..';

import type { InsertInstructionQueryParamsType } from './types';
import type { InsertActivityQueryParamsType } from './types';
import type { InsertTriggerQueryParamsType } from './types';
import type { InsertQueryResponseType } from './types';

import type { CreateLetterQueryParamsType } from './types';
import type { CreateChatMessageQueryParamsType } from './types';
import type { CreateTicketQueryParamsType } from './types';
import type { CreateSomethingQueryResponseType } from './types';

const responseCallback = (): InsertQueryResponseType => {
    return {
        id: getRandomArbitrary(0, 1000),
    };
};

const createSomethingResponseCallback = (): CreateSomethingQueryResponseType => {
    return { id: getRandomArbitrary(1, 10000) };
};

export const InsertAPI = {
    insertInstruction: async (params: InsertInstructionQueryParamsType) => {
        return query(responseCallback);
    },

    insertActivity: async (params: InsertActivityQueryParamsType) => {
        return query(responseCallback);
    },

    insertTrigger: async (params: InsertTriggerQueryParamsType) => {
        return query(responseCallback);
    },

    createLetter: async (params: CreateLetterQueryParamsType) => {
        return query(createSomethingResponseCallback);
    },

    createChatMessage: async (params: CreateChatMessageQueryParamsType) => {
        return query(createSomethingResponseCallback);
    },

    createTicket: async (params: CreateTicketQueryParamsType) => {
        return query(createSomethingResponseCallback);
    },
};
