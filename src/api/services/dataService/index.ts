export type PostDataQueryParamsType = {
    dwh_link: string;
};

export type PostDataQueryResponseType = {
    [variableName: string]: {
        structure: 'scalar' | 'array';
        type: string;
    };
};
