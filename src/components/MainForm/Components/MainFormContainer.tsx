import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { postDataThunk } from '../MainFormReduxSlice';

import { getVariables } from '../MainFormReduxSelectors';

import MainForm from './MainForm';

const MainFormContainer: React.FC = () => {
    const Variables = useSelector(getVariables);

    const dispatch = useDispatch();

    const handleDataPost = useCallback((dwh_link: string) => {
        dispatch(postDataThunk({ dwh_link }));
    }, []);

    return <MainForm {...{ Variables }} {...{ handleDataPost }} />;
};

export default MainFormContainer;
