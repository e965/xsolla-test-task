import React, { useMemo } from 'react';

import type { MainFormReduxState } from '../../../../MainFormTypes';

import TextInputWithHightlight from '../../../Inputs/TextInputWithHightlight';
import TextareaWithHightlight from '../../../Inputs/TextareaWithHightlight';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    //
};

const LetterFormItems: React.FC<PropsType> = props => {
    const { Variables } = props;

    const VariablesKeys = useMemo(() => Object.keys(Variables ?? {}), [Variables]);

    return (
        <>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_from">
                    From
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'letter_from', name: 'letter_from' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_to">
                    To
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'letter_to', name: 'letter_to' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_subject">
                    Subject
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'letter_subject', name: 'letter_subject' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_text">
                    Text
                </label>
                <TextareaWithHightlight
                    textareaClassName="mainForm__formItem__input mainForm__formItem__input--textarea"
                    textareaProps={{ id: 'letter_text', name: 'letter_text' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
        </>
    );
};

export default LetterFormItems;
