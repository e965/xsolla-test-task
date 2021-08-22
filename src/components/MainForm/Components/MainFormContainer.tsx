import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stringify as createYamlString } from 'yaml';

import type { MainFormEntriesType } from '../MainFormTypes';

import { postDataThunk } from '../MainFormReduxSlice';
import { insertInstructionThunk, insertActivityThunk, insertTriggerThunk } from '../MainFormReduxSlice';

import { resetReduxState, resetQueryPayloads } from '../MainFormReduxSlice';

import { getVariables, getVariablesKeys } from '../MainFormReduxSelectors';
import { getInstructionInsertPayload, getActivityInsertPayload, getTriggerInsertPayload } from '../MainFormReduxSelectors';
import { getSubmitedFormData, getIsFormSubmitPending } from '../MainFormReduxSelectors';

import MainForm from './MainForm';

const MainFormContainer: React.FC = () => {
    const Variables = useSelector(getVariables);
    const VariablesKeys = useSelector(getVariablesKeys);

    const InstructionInsertPayload = useSelector(getInstructionInsertPayload);
    const ActivityInsertPayload = useSelector(getActivityInsertPayload);
    const TriggerInsertPayload = useSelector(getTriggerInsertPayload);

    const SubmitedFormData = useSelector(getSubmitedFormData);
    const IsFormSubmitPending = useSelector(getIsFormSubmitPending);

    const dispatch = useDispatch();

    useEffect(() => {
        if (InstructionInsertPayload) {
            dispatch(
                insertActivityThunk({
                    instruction_id: InstructionInsertPayload.id,
                    integrator_id: 322,
                    priority: 0,
                })
            );
        }
    }, [dispatch, InstructionInsertPayload]);

    useEffect(() => {
        if (ActivityInsertPayload && SubmitedFormData) {
            dispatch(
                insertTriggerThunk({
                    type: 0,
                    activites_id: [ActivityInsertPayload.id],
                    value: `${SubmitedFormData.cron_exp} ${SubmitedFormData.timezone}`,
                })
            );
        }
    }, [dispatch, ActivityInsertPayload]);

    useEffect(() => {
        if (TriggerInsertPayload) {
            alert('Activity created!');
            dispatch(resetQueryPayloads());
        }
    }, [TriggerInsertPayload]);

    const handleDataPost = useCallback(
        (dwh_link: string) => {
            dispatch(postDataThunk({ source: dwh_link }));
        },
        [dispatch]
    );

    const handleFormEntriesSubmit = useCallback(
        (formEntries: MainFormEntriesType) => {
            let templateObject: unknown = '';

            const replaceVariables = (text: string) => {
                let newText = text;

                VariablesKeys.forEach(variableText => {
                    newText = newText.replaceAll(`{{ ${variableText} }}`, `{{ data.${variableText} }}`);
                });

                return newText;
            };

            switch (formEntries.activity_type) {
                case 'letter':
                    templateObject = {
                        recipients: {
                            content: {
                                type: 'text/html',
                                value: 'body',
                            },
                            to: {
                                email: replaceVariables(formEntries.letter_from),
                                name: '',
                                substitutions: [{ key: 'body', value: '' }],
                            },
                            from: {
                                email: replaceVariables(formEntries.letter_to),
                                name: '',
                            },
                            subject: replaceVariables(formEntries.letter_subject),
                            text: replaceVariables(formEntries.letter_text),
                            is_multiple: true,
                        },
                    };
                    break;

                case 'chat_message':
                    templateObject = {
                        messages: {
                            webhook: replaceVariables(formEntries.chat_webhook_url),
                            message: {
                                text: replaceVariables(formEntries.chat_text),
                            },
                        },
                    };
                    break;

                case 'ticket':
                    templateObject = {
                        issues: {
                            fields: {
                                summary: replaceVariables(formEntries.ticket_summary),
                                description: replaceVariables(formEntries.ticket_description),
                                reporter: {
                                    accountId: replaceVariables(formEntries.ticket_reporter),
                                },
                                assignee: {
                                    accountId: replaceVariables(formEntries.ticket_assignee),
                                },
                            },
                        },
                    };
            }

            const TemplateString = createYamlString(templateObject);

            dispatch(
                insertInstructionThunk({
                    params: {
                        type: 0,
                        template: TemplateString,
                    },
                    formData: formEntries,
                })
            );
        },
        [dispatch, VariablesKeys]
    );

    const handleFormReset = useCallback(() => {
        dispatch(resetReduxState());
    }, [dispatch]);

    return (
        <MainForm
            {...{ Variables, VariablesKeys }}
            {...{ IsFormSubmitPending }}
            {...{ handleDataPost }}
            {...{ handleFormEntriesSubmit, handleFormReset }}
        />
    );
};

export default MainFormContainer;
