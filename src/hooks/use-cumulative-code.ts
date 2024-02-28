import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { order, data } = state.cells;

    const orderedCells = order.map((id) => data[id]);
    const cumulativeCode: string[] = [];

    const showFunc = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';
  
  var show = (value) => {
    const root = document.getElementById('root');

    if (typeof value === 'object') {
      if (value.$$typeof && value.props) {
        return _ReactDOM.render(value, root);
      } else {
        return root.innerHTML = JSON.stringify(value);
      }
    } else {
      root.innerHTML = value;
    }
  }
  `;

    const showFuncNoOp = 'var show = (value) => {}';

    for (const cell of orderedCells) {
      if (cell.type === 'code') {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOp);
        }
        cumulativeCode.push(cell.content);
      }
      if (cell.id === cellId) {
        break;
      }
    }

    return cumulativeCode.join('\n');
  });
};
