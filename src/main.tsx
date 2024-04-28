import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import { mockCats } from './config/data.ts';
import { storeCatsInCache } from './utils/cache.ts';

async function enableMockServiceWorker() {
  await storeCatsInCache(mockCats, true);
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

// Mounting the UI once the mock service worker is ready
enableMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
      <App />
  )
});
