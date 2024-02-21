import CellListItem from './CellListItem';
import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './AddCell';

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <div key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </div>
  ));

  return (
    <>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </>
  );
};

export default CellList;
