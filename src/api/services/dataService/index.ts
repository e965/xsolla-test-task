import { query } from '../..';
import { getRandomArbitrary } from '../..';

import { PostDataQueryParamsType, PostDataQueryResponseType } from './types';

const queryCallback = (): PostDataQueryResponseType => {
    const response = {} as PostDataQueryResponseType;

    const strings = ['url', 'variable', 'test', 'date', 'title', 'buddy', 'hey', 'xsolla'];

    const variablesLength = getRandomArbitrary(1, strings.length);

    const fillResponse = () => {
        if (Object.keys(response).length < variablesLength) {
            response[strings[getRandomArbitrary(0, strings.length)]] = {
                structure: 'scalar',
                type: 'string',
            };

            fillResponse();
        }
    };

    fillResponse();

    return response;
};

export const DataAPI = {
    postData: async (params: PostDataQueryParamsType) => {
        return query(queryCallback);
    },
};
