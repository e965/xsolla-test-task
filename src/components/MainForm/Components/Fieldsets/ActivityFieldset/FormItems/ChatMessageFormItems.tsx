import React from 'react';

import TextInputWithHightlight from '../../../Inputs/TextInputWithHightlight';
import TextareaWithHightlight from '../../../Inputs/TextareaWithHightlight';

type PropsType = {
    VariablesKeys: string[];
};

const ChatMessageFormItems: React.FC<PropsType> = props => {
    const { VariablesKeys } = props;

    return (
        <>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="chat_webhook_url">
                    Webhook URL
                </label>
                <TextInputWithHightlight
                    inputClassName="mainForm__formItem__input"
                    inputProps={{ id: 'chat_webhook_url', name: 'chat_webhook_url' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="chat_text">
                    Text
                </label>
                <TextareaWithHightlight
                    textareaClassName="mainForm__formItem__input mainForm__formItem__input--textarea"
                    textareaProps={{ id: 'chat_text', name: 'chat_text' }}
                    hightlightArray={VariablesKeys}
                />
            </div>
        </>
    );
};

export default ChatMessageFormItems;
