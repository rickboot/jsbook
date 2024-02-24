import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useMemo } from 'react';

export const useActions = () => {
  const dispatch = useDispatch();

  //! useMemo to prevent rebinding on every use of useActions
  return useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
};
