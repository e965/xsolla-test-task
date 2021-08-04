import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { postDataThunk } from '../MainFormReduxSlice';

import { getVariables, getVariablesKeys } from '../MainFormReduxSelectors';

import MainForm from './MainForm';

const MainFormContainer: React.FC = () => {
    const Variables = useSelector(getVariables);
    const VariablesKeys = useSelector(getVariablesKeys);

    const dispatch = useDispatch();

    const handleDataPost = useCallback((dwh_link: string) => {
        dispatch(postDataThunk({ dwh_link }));
    }, []);

    return <MainForm {...{ Variables, VariablesKeys }} {...{ handleDataPost }} />;
};

export default MainFormContainer;
