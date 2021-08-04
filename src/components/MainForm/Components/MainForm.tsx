import React, { useCallback } from 'react';

import type { MainFormReduxState } from '../MainFormTypes';

import DataFieldset from './Fieldsets/DataFieldset';
import TriggerFieldset from './Fieldsets/TriggerFieldset';
import ActivityFieldset from './Fieldsets/ActivityFieldset/ActivityFieldset';

import './MainForm.scss';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    handleDataPost: (dwhLink: string) => void;
};

const MainForm: React.FC<PropsType> = props => {
    const { Variables } = props;
    const { handleDataPost } = props;

    const formSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

    return (
        <form className="mainForm" onSubmit={formSubmitHandler}>
            <DataFieldset {...{ handleDataPost }} />

            <hr className="mainForm__separator" />

            <TriggerFieldset />

            <hr className="mainForm__separator" />

            <ActivityFieldset {...{ Variables }} />

            <div className="mainForm__buttons">
                <div>
                    <button type="submit">Save</button>
                </div>
                <div>
                    <button>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default MainForm;
