import CellListItem from './CellListItem';
import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './AddCell';
import './CellList.css';

const CellList = () => {
  const { data, order } = useTypedSelector((state) => state.cells);
  const cells = order.map((id) => data[id]);

  const renderedCells = cells.map((cell) => (
    <div key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </div>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
