import React, { useState } from 'react';

import FieldInFocusContext, { InputInteractionsObjectType } from './FieldInFocusContext';

const FieldInFocusContextProvider: React.FC = ({ children }) => {
    const StateContext = useState<InputInteractionsObjectType>();

    return <FieldInFocusContext.Provider value={StateContext}>{children}</FieldInFocusContext.Provider>;
};

export default FieldInFocusContextProvider;
