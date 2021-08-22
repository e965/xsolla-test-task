import type { PostDataQueryResponseType } from '../../api/services/dataService/types';
import type { InsertQueryResponseType } from '../../api/services/insertService/types';

export type ActivityType = 'letter' | 'chat_message' | 'ticket' | 'none';

export type CommonInsertQueryPayload = InsertQueryResponseType & {
    timestamp: string;
};

export type LetterDataType = {
    letter_from: string;
    letter_to: string;
    letter_subject: string;
    letter_text: string;
};

export type ChatMessageDataType = {
    chat_webhook_url: string;
    chat_text: string;
};

export type TicketDataType = {
    ticket_summary: string;
    ticket_description: string;
    ticket_assignee: string;
    ticket_reporter: string;
};

export type MainFormEntriesType = {
    dwh_link: string;
    cron_exp: string;
    timezone: number;
    activity_type: ActivityType;
} & LetterDataType &
    ChatMessageDataType &
    TicketDataType;

export type MainFormReduxState = {
    Variables: PostDataQueryResponseType | null;
    InstructionInsertPayload: CommonInsertQueryPayload | null;
    ActivityInsertPayload: CommonInsertQueryPayload | null;
    TriggerInsertPayload: CommonInsertQueryPayload | null;
    SubmitedFormData: MainFormEntriesType | null;
    IsFormSubmitPending: boolean;
};
