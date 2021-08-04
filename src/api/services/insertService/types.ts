export type CreateSomethingQueryParamsType = {
    dwh_link: string;
    cron_exp: string;
    timezone: number;
};

export type CreateLetterQueryParamsType = CreateSomethingQueryParamsType & {
    data: {
        letter_from: string;
        letter_to: string;
        letter_subject: string;
        letter_text: string;
    };
};

export type CreateChatMessageQueryParamsType = CreateSomethingQueryParamsType & {
    data: {
        chat_webhook_url: string;
        chat_text: string;
    };
};

export type CreateTicketQueryParamsType = CreateSomethingQueryParamsType & {
    data: {
        ticket_summary: string;
        ticket_description: string;
        ticket_assignee: string;
        ticket_reporter: string;
    };
};

export type CreateSomethingQueryResponseType = {
    id: number;
};

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
