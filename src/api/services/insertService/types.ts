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
