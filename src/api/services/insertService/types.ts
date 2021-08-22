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

export enum InstructionTypeEnum {
    jinja_yaml = 0,
    jinja,
    yaml,
}

export type InsertInstructionQueryParamsType = {
    type?: InstructionTypeEnum;
    template: string;
};

export type InsertActivityQueryParamsType = {
    instruction_id: number;
    integrator_id: number;
    priority: number;
};

export enum TriggerTypeEnum {
    cron = 0,
    true,
    false,
}

export type InsertTriggerQueryParamsType = {
    type?: TriggerTypeEnum;
    activites_id: number[];
    value?: string;
};

export type InsertQueryResponseType = {
    id: number;
};
