import { PostDataQueryResponseType } from '../../api/services/dataService/types';

import type { CreateLetterQueryParamsType } from '../../api/services/insertService/types';
import type { CreateChatMessageQueryParamsType } from '../../api/services/insertService/types';
import type { CreateTicketQueryParamsType } from '../../api/services/insertService/types';
import type { CreateSomethingQueryParamsType } from '../../api/services/insertService/types';

export type ActivityType = 'letter' | 'chat_message' | 'ticket' | 'none';

export type MainFormReduxState = {
    Variables: PostDataQueryResponseType | null;
    CreationPayload: {
        type: ActivityType;
        id: number;
        timestamp: string;
    } | null;
};

export type MainFormEntriesType = CreateSomethingQueryParamsType & {
    activity_type: ActivityType;
} & CreateLetterQueryParamsType['data'] &
    CreateChatMessageQueryParamsType['data'] &
    CreateTicketQueryParamsType['data'];
