import React, { useState, useCallback } from 'react';

import type { MainFormReduxState } from '../MainFormTypes';
import type { ActivityType, MainFormEntriesType } from '../MainFormTypes';

import { FieldInFocusProvider } from './FieldInFocusContext/FieldInFocusContext';

import DataFieldset from './Fieldsets/DataFieldset';
import TriggerFieldset from './Fieldsets/TriggerFieldset';
import ActivityFieldset from './Fieldsets/ActivityFieldset/ActivityFieldset';

import './MainForm.scss';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    VariablesKeys: string[];
    handleDataPost: (dwhLink: string) => void;
    handleFormEntriesSubmit: (formEntries: MainFormEntriesType) => void;
};

const MainForm: React.FC<PropsType> = props => {
    const { Variables, VariablesKeys } = props;
    const { handleDataPost } = props;
    const { handleFormEntriesSubmit } = props;

    const [IsTriggerUnlocked, setIsTriggerUnlocked] = useState<boolean>(false);
    const [IsActivityUnlocked, setIsActivityUnlocked] = useState<boolean>(false);
    const [SelectedActivityType, setSelectedActivityType] = useState<ActivityType>('none');

    const formSubmitHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const _FormData = new FormData(event.target as HTMLFormElement);
            const FormEntries = Object.fromEntries(_FormData) as unknown as MainFormEntriesType;

            if (FormEntries.activity_type === 'none') {
                return alert('No activity type selected');
            }

            handleFormEntriesSubmit(FormEntries);
        },
        [handleFormEntriesSubmit]
    );

    const selectedActivityTypeChange = useCallback((activityType: ActivityType) => {
        setSelectedActivityType(activityType);
    }, []);

    const handleDataFieldsSetted = useCallback(() => {
        setIsTriggerUnlocked(true);
    }, []);

    const handleTriggerFieldsSetted = useCallback(() => {
        setIsActivityUnlocked(true);
    }, []);

    return (
        <form className="mainForm" onSubmit={formSubmitHandler}>
            <DataFieldset {...{ handleDataPost }} {...{ handleDataFieldsSetted }} />

            <hr className="mainForm__separator" />

            <TriggerFieldset {...{ IsTriggerUnlocked }} {...{ handleTriggerFieldsSetted }} />

            <hr className="mainForm__separator" />

            <FieldInFocusProvider>
                <ActivityFieldset
                    {...{ Variables, VariablesKeys }}
                    {...{ IsActivityUnlocked }}
                    {...{ SelectedActivityType, selectedActivityTypeChange }}
                />
            </FieldInFocusProvider>

            {SelectedActivityType !== 'none' && IsActivityUnlocked ? (
                <div className="mainForm__buttons">
                    <div>
                        <button type="submit">Create</button>
                    </div>
                    <div>
                        <button type="reset">Reset</button>
                    </div>
                </div>
            ) : null}
        </form>
    );
};

export default MainForm;
