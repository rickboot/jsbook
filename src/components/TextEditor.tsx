import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../cell';
import './TextEditor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  const ref = useRef<HTMLDivElement>(null);

  // listener to detect clicks in/out of editor
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
        <MDEditor
          value={cell.content}
          onChange={(input) => updateCell(cell.id, input ?? '')}
        />
      </div>
    );
  } else {
    return (
      <div ref={ref} className='text-editor card'>
        <div className='card-content'>
          <MDEditor.Markdown
            source={cell.content || 'Click to edit'}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
      </div>
    );
  }
};

export default TextEditor;
