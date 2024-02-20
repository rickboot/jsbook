import CellListItem from './CellListItem';
import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));
  return <div>{renderedCells}</div>;
};

export default CellList;
