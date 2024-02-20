import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './TextEditor.css';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('# Heading');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setEditing(true);
      } else {
        setEditing(false);
      }
    };
    document.addEventListener('click', listener, { capture: true });

    return () =>
      document.removeEventListener('click', listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor value={text} onChange={(input) => setText(input ?? '')} />
      </div>
    );
  } else {
    return (
      <div ref={ref} className='text-editor card'>
        <div className='card-content'>
          <MDEditor.Markdown source={text} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
