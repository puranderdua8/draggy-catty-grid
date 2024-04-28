import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import { mockCats } from './config/data.ts';
import { storeCatsInCache } from './utils/cache.ts';

// Helper to start the mock service worker
async function enableMockServiceWorker() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  
  // Storing data in cache
  await storeCatsInCache(mockCats, true);

  // initializing and starting the mock service worker
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

// Mounting the UI once the mock service worker is ready
enableMockServiceWorker().then(async () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
      <App />
  )
});
