import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import bundler from '../bundler';
import ResizableContainer from './ResizableContainer';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const code = await bundler(input);
      setCode(code);
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

        <Preview code={code} />
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
