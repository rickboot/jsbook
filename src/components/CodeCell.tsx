import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import bundler from '../bundler';
import ResizableContainer from './ResizableContainer';
import { Cell } from '../state';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState(cell.content);
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundle = await bundler(input);
      setCode(bundle.code);
      setErr(bundle.err);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <ResizableContainer direction='vertical'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <ResizableContainer direction='horizontal'>
          <CodeEditor
            initialValue='let love = true;'
            onChange={(value: string) => setInput(value)}
          />
        </ResizableContainer>

        <Preview code={code} err={err} />
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
