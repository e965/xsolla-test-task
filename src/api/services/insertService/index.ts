import { query } from '../..';
import { getRandomArbitrary } from '../..';

import type { InsertInstructionQueryParamsType } from './types';
import type { InsertActivityQueryParamsType } from './types';
import type { InsertTriggerQueryParamsType } from './types';
import type { InsertQueryResponseType } from './types';

const responseCallback = (): InsertQueryResponseType => {
    return {
        title: 'item_' + getRandomArbitrary(0, 1000),
        type: 'string',
        properties: {
            id: {
                title: 'item_' + getRandomArbitrary(0, 1000),
                exclusiveMinimum: getRandomArbitrary(0, 1000),
                type: 'string',
            },
        },
        required: ['id'],
    };
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
};
