export type InsertInstructionQueryParamsType = {
    title: string;
    type: string;
    properties: {
        type: {
            title: string;
            default: string;
            enum: ('jinja_yaml' | 'jinja' | 'yaml')[];
            type: string;
        };
        template: {
            title: string;
            type: string;
        };
    };
    required: string[];
};

export type InsertActivityQueryParamsType = {
    title: string;
    type: string;
    properties: {
        instruction_id: {
            title: string;
            exclusiveMinimum: number;
            type: string;
        };
        integrator_id: {
            title: string;
            exclusiveMinimum: number;
            type: string;
        };
        priority: {
            title: string;
            type: string;
        };
    };
    required: ('instruction_id' | 'integrator_id' | 'priority')[];
};

export type InsertTriggerQueryParamsType = {
    title: string;
    type: string;
    properties: {
        type: {
            title: string;
            default: string;
            enum: ('cron' | 'true' | 'false')[];
            type: string;
        };
        activites_id: {
            title: string;
            type: string;
            items: {
                type: string;
            };
        };
        value: {
            title: string;
            type: string;
        };
    };
    required: 'activites_id'[];
};

export type InsertQueryResponseType = {
    title: string;
    type: string;
    properties: {
        id: {
            title: string;
            exclusiveMinimum: number;
            type: string;
        };
    };
    required: 'id'[];
};
