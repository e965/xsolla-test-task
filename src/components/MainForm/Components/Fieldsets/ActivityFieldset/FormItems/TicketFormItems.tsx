import React, { useMemo } from 'react';

import type { MainFormReduxState } from '../../../../MainFormTypes';

import TextInputWithHightlight from '../../../Inputs/TextInputWithHightlight';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    //
};

const TicketFormItems: React.FC<PropsType> = props => {
    const { Variables } = props;

    const VariablesKeys = useMemo(() => Object.keys(Variables ?? {}), [Variables]);

    return (
        <>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="ticket_summary">
                    Summary
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'letter_from', name: 'letter_from' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="ticket_description">
                    Description
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'ticket_description', name: 'ticket_description' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="ticket_assignee">
                    Assignee
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'ticket_assignee', name: 'ticket_assignee' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="ticket_reporter">
                    Reporter
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'ticket_reporter', name: 'ticket_reporter' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
        </>
    );
};

export default TicketFormItems;