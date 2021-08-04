import React, { useState, useCallback } from 'react';

import type { MainFormReduxState } from '../MainFormTypes';
import type { ActivityType } from '../MainFormTypes';

import DataFieldset from './Fieldsets/DataFieldset';
import TriggerFieldset from './Fieldsets/TriggerFieldset';
import ActivityFieldset from './Fieldsets/ActivityFieldset/ActivityFieldset';

import './MainForm.scss';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    VariablesKeys: string[];
    handleDataPost: (dwhLink: string) => void;
};

const MainForm: React.FC<PropsType> = props => {
    const { Variables, VariablesKeys } = props;
    const { handleDataPost } = props;

    const [SelectedActivityType, setSelectedActivityType] = useState<ActivityType>('none');

    const formSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

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
                        <button type="submit">Save</button>
                    </div>
                    <div>
                        <button>Cancel</button>
                    </div>
                </div>
            ) : null}
        </form>
    );
};

export default MainForm;
