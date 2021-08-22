import React, { useState, useCallback } from 'react';

import type { MainFormReduxState } from '../MainFormTypes';
import type { ActivityType, MainFormEntriesType } from '../MainFormTypes';

import FieldInFocusContextProvider from './FieldInFocusContext/FieldInFocusContextProvider';

import DataFieldset from './Fieldsets/DataFieldset';
import TriggerFieldset from './Fieldsets/TriggerFieldset';
import ActivityFieldset from './Fieldsets/ActivityFieldset/ActivityFieldset';

import './MainForm.scss';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    VariablesKeys: string[];
    IsFormSubmitPending: boolean;
    handleDataPost: (dwhLink: string) => void;
    handleFormEntriesSubmit: (formEntries: MainFormEntriesType) => void;
    handleFormReset: () => void;
};

const MainForm: React.FC<PropsType> = props => {
    const { Variables, VariablesKeys, IsFormSubmitPending } = props;
    const { handleDataPost } = props;
    const { handleFormEntriesSubmit, handleFormReset } = props;

    const [IsTriggerUnlocked, setIsTriggerUnlocked] = useState(false);
    const [IsActivityUnlocked, setIsActivityUnlocked] = useState(false);
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

    const formResetHandler = useCallback(() => {
        setIsTriggerUnlocked(false);
        setIsActivityUnlocked(false);
        setSelectedActivityType('none');
        handleFormReset();
    }, [handleFormReset]);

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
        <form className="mainForm" onSubmit={formSubmitHandler} onReset={formResetHandler}>
            <DataFieldset {...{ handleDataPost }} {...{ handleDataFieldsSetted }} />

            <hr className="mainForm__separator" />

            <TriggerFieldset {...{ IsTriggerUnlocked }} {...{ handleTriggerFieldsSetted }} />

            <hr className="mainForm__separator" />

            <FieldInFocusContextProvider>
                <ActivityFieldset
                    {...{ Variables, VariablesKeys }}
                    {...{ IsActivityUnlocked }}
                    {...{ SelectedActivityType, selectedActivityTypeChange }}
                />
            </FieldInFocusContextProvider>

            {SelectedActivityType !== 'none' && IsActivityUnlocked ? (
                <div className="mainForm__buttons">
                    <div>
                        <button type="submit" disabled={IsFormSubmitPending}>
                            Create
                        </button>
                    </div>
                    <div>
                        <button type="reset" disabled={IsFormSubmitPending}>
                            Reset
                        </button>
                    </div>
                </div>
            ) : null}
        </form>
    );
};

export default MainForm;
