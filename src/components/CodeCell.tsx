import { useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import Resizable from './Resizable';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';
import { Cell } from '../state';
import './CodeCell.css';
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const { createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </Resizable>

        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-bar'>
              <progress className='progress is-small is-primary ' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
