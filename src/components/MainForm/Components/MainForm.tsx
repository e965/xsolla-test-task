import React, { useState, useCallback } from 'react';

import type { MainFormReduxState } from '../MainFormTypes';
import type { ActivityType, MainFormEntriesType } from '../MainFormTypes';

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

    return (
        <form className="mainForm" onSubmit={formSubmitHandler}>
            <DataFieldset {...{ handleDataPost }} />

            <hr className="mainForm__separator" />

            <TriggerFieldset />

            <hr className="mainForm__separator" />

            <ActivityFieldset {...{ Variables, VariablesKeys }} {...{ SelectedActivityType, selectedActivityTypeChange }} />

            {SelectedActivityType !== 'none' ? (
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
