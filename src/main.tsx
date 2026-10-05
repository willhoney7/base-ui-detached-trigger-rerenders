import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

// No StrictMode, so each count is one real render rather than a doubled one.
createRoot(document.getElementById('root')!).render(<App />);
