import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CellList from './components/CellList';
import { store } from './state';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);
