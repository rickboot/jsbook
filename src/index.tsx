import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import CellList from './components/CellList';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

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
