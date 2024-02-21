import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import bundler from '../bundler';
import Resizable from './Resizable';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [bundledCode, setBundledCode] = useState('');
  const [err, setErr] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundle = await bundler(cell.content);
      setBundledCode(bundle.code);
      setErr(bundle.err);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

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

        <Preview code={bundledCode} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
