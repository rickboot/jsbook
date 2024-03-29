import { Cell } from './../../cell';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { produce } from 'immer';

interface CellsState {
  data: {
    [key: string]: Cell;
  };
  order: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    }
    case ActionType.DELETE_CELL: {
      const id = action.payload;
      delete state.data[id];
      state.order = state.order.filter((data) => data !== id);
      return state;
    }
    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;

      const index = state.order.findIndex((el) => el === id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
      return state;
    }
    case ActionType.INSERT_CELL_AFTER: {
      const { content } = action.payload;
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content,
      };
      state.data[cell.id] = cell;

      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
      return state;
    }
    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
