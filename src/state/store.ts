import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';
// todo: delete the following dummy data code
import { ActionType } from './action-types';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// todo: delete the following dummy data code

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code',
  },
});
