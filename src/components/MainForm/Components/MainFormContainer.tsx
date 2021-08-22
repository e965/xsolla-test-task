import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import type { MainFormEntriesType } from '../MainFormTypes';

import { postDataThunk } from '../MainFormReduxSlice';
import { createLetterThunk, createChatMessageThunk, createTicketThunk } from '../MainFormReduxSlice';

import { resetReduxState } from '../MainFormReduxSlice';

import { getVariables, getVariablesKeys } from '../MainFormReduxSelectors';
import { getCreationPayload } from '../MainFormReduxSelectors';

import MainForm from './MainForm';

const MainFormContainer: React.FC = () => {
    const Variables = useSelector(getVariables);
    const VariablesKeys = useSelector(getVariablesKeys);
    const CreationPayload = useSelector(getCreationPayload);

    const dispatch = useDispatch();

    useEffect(() => {
        if (CreationPayload) {
            let activityName = '';

            switch (CreationPayload.type) {
                case 'letter':
                    activityName = 'Letter';
                    break;
                case 'chat_message':
                    activityName = 'Chat Message';
                    break;
                case 'ticket':
                    activityName = 'Ticket';
                    break;
            }

            alert(`Activity "${activityName}" has been successfully created (ID: ${CreationPayload.id})`);
        }
    }, [CreationPayload]);

    const handleDataPost = useCallback(
        (dwh_link: string) => {
            dispatch(postDataThunk({ dwh_link }));
        },
        [dispatch]
    );

    const handleFormEntriesSubmit = useCallback(
        (formEntries: MainFormEntriesType) => {
            const CommonData: Pick<MainFormEntriesType, 'dwh_link' | 'cron_exp' | 'timezone'> = {
                dwh_link: formEntries.dwh_link,
                cron_exp: formEntries.cron_exp,
                timezone: formEntries.timezone,
            };

            switch (formEntries.activity_type) {
                case 'letter':
                    dispatch(
                        createLetterThunk({
                            ...CommonData,
                            data: {
                                letter_from: formEntries.letter_from,
                                letter_to: formEntries.letter_to,
                                letter_subject: formEntries.letter_subject,
                                letter_text: formEntries.letter_text,
                            },
                        })
                    );
                    break;

                case 'chat_message':
                    dispatch(
                        createChatMessageThunk({
                            ...CommonData,
                            data: {
                                chat_webhook_url: formEntries.chat_webhook_url,
                                chat_text: formEntries.chat_text,
                            },
                        })
                    );
                    break;

                case 'ticket':
                    dispatch(
                        createTicketThunk({
                            ...CommonData,
                            data: {
                                ticket_summary: formEntries.ticket_summary,
                                ticket_description: formEntries.ticket_description,
                                ticket_assignee: formEntries.ticket_assignee,
                                ticket_reporter: formEntries.ticket_reporter,
                            },
                        })
                    );
            }
        },
        [dispatch]
    );

    const handleFormReset = useCallback(() => {
        dispatch(resetReduxState());
    }, [dispatch]);

    return <MainForm {...{ Variables, VariablesKeys }} {...{ handleDataPost }} {...{ handleFormEntriesSubmit, handleFormReset }} />;
};

export default MainFormContainer;
