import { createRoot } from 'react-dom/client';
import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <div>
      <CodeCell />
      <TextEditor />
    </div>
  );
};

const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);
