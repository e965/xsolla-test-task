import { PostDataQueryResponseType } from '../../api/services/dataService/types';

export type MainFormReduxState = {
    Variables: PostDataQueryResponseType | null;
};

export type ActivityType = 'letter' | 'chat_message' | 'ticket' | 'none';
