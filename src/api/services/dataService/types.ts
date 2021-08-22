export type PostDataQueryParamsType = {
    source: string;
};

export type PostDataQueryResponseType = {
    [variableName: string]: {
        structure: 'scalar' | 'array';
        type: string;
    };
};
