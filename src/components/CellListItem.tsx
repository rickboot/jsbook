import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem = ({ cell }: CellListItemProps) => {
  let cellComponent: JSX.Element;
  if (cell.type === 'code') {
    cellComponent = <CodeCell cell={cell} />;
  } else {
    cellComponent = <TextEditor />;
  }

  return <div>{cellComponent}</div>;
};

export default CellListItem;
